library(truncnorm)

# This is a Sarsa RL model to compute the optimal choiches in a simple game
# There are two states. In each state there are two options. The two options lead deterministically to one of the two pay-offs
# The pay-offs are static
# Variables
ntrial <- 100 # Total number of trials

# Rewards function
min_reward = 0
max_reward= 10
rew <- rep(0.0,ntrial)
rew[1] <- runif(1,min_reward,max_reward)
for(t in 2:ntrial) {
  rew[t] <- rtruncnorm(1,mean=rew[t-1],sd=.5,a=min_reward,b=max_reward)
}
plot(rew,type="l")
abline(h=5)

# define the task
states <- 1:4
actions <- 1:4
nstate <- length(states)
naction <- length(actions)
# initial state probabilities at the start of an episode
ps_0 <- rep(0.0,nstate)
ps_0[1:2] <- .5
# the following is an array with transition probabilities: [s,a,s'] (from (s,a) -> s')
s_sa <- array(0.0,dim=c(nstate,naction,nstate))
s_sa[1,1,3] <- s_sa[1,2,4] <- s_sa[2,3,3] <- s_sa[2,4,4] <- 1.0
# reward_function 
reward_function <- function(previous_state,previous_action,current_state,current_trial,rewards=rew) {
  reward <- 0
  if(current_state == 3) reward <- rewards[current_trial]
  if(current_state == 4) reward <- 10 - rewards[current_trial]
  return(reward)
}
# allowed actions
a_s <- rbind(
  c(1,1,0,0),
  c(0,0,1,1),
  c(0,0,0,0),
  c(0,0,0,0)
)

# SARSA learning
# Control parameters
alpha <- .2 # learning rate
beta <- 1 # softmax inverse temperature
lambda <- 0.9 # eligibility trace decay
gamma <- 0.90 # discount factor
# Q values
Q <- array(0.0,dim=c(nstate,naction))
# eligibiility traces
eligibility <- Q
# storing the end-of-episode Q values for later
Q_storage <- array(0.0,dim=c(nstate,naction,ntrial+1))

# simulation

for(t in 1:ntrial) {
  # reset eligibility traces
  eligibility[] <- 0
  # draw initial state
  next_state <- sample(states,size=1,prob=ps_0)
  # determine initial action
  p_act <- rep(0.0,length(actions))
  focalQ <- exp(beta*Q[which(states == next_state),a_s[which(states == next_state),]])
  p_act[as.logical(a_s[which(states == next_state),])] <- focalQ/sum(focalQ)
  next_action <- sample(actions,size=1,prob=p_act) # sample action with probabilities
  # start cycling through task until an end state is reached
  terminate <- FALSE
  while(!terminate) {
    # "take the current action"
    current_state <- next_state
    current_action <- next_action
    # determine next state
    next_state <- sample(states,size=1,prob=s_sa[current_state,current_action,])
    # "observe" reward received by transitioning to next_state
    current_reward <- reward_function(current_state,current_action,next_state,t)
    # are we transitioning to a terminal state?
    if(sum(a_s[which(states == next_state),]) == 0) {
      terminate <- TRUE
      next_action <- NA
    } else {
      # determine next action
      p_act <- rep(0.0,length(actions))
      focalQ <- exp(beta*Q[which(states == next_state),a_s[which(states == next_state),]])
      p_act[as.logical(a_s[which(states == next_state),])] <- focalQ/sum(focalQ)
      next_action <- sample(actions,size=1,prob=p_act) # sample action with probabilities
    }
    # compute 'Q error'
    delta <- current_reward + ifelse(!is.na(next_action),gamma*Q[next_state,next_action],0) - Q[current_state,current_action]
    # update eligibility trace
    eligibility[current_state,current_action] <- eligibility[current_state,current_action] + 1
    Q <- Q + alpha*delta*eligibility
    eligibility <- eligibility*gamma*lambda
  }
  Q_storage[,,t] <- Q
}

plot(10 - rew, xlim=c(0,200), ylim=c(-1,11))
points(rew,col="red")
lines(Q_storage[1,2,])
lines(Q_storage[1,1,],col="red")
lines(Q_storage[2,3,],col="red",lty=2)
lines(Q_storage[2,4,])