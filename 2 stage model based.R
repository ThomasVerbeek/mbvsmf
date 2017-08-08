# This is a Sarsa RL model to compute the optimal choiches in a multi-dimensional game
# There are two starting states, 2 layers, 4 total states and 4 rewards 
# In each state there are two options. The two options lead deterministically to one of the two pay-offs
# The pay-offs are static

library(truncnorm)
min_reward <- 0
max_reward <- 10
# Variables
ntrial <- 200 # Total number of trials

rew <- rep(0.0,ntrial)
rew[1] <- runif(1,min_reward,max_reward)
for(t in 2:ntrial) {
  rew[t] <- rtruncnorm(1,mean=rew[t-1],sd=.5,a=min_reward,b=max_reward)
}
plot(rew,type="l")
abline(h=5)


# Environment of the model
states_1 <- 1:2 # IDs of the states in stage 1, '1' corresponds to 'State 1', '2' corresponds to 'State 2'
actions_1 <- 1:2 # IDs of the actions in stage 1, '1' corresponds to 'Left', '2' corresponds to 'Right'
states_2 <- 1:2  # IDs of the states in stage 2, '1' corresponds to 'State 3', '2' corresponds to 'State 4'
rewards <- c(5,10) # The rewards of the two end-points
count <- 0

# SARSA learning
# Control parameters
alpha <- .2 # learning rate
beta <- 1 # softmax inverse temperature
# Storing the Q values; we need only learn the rewards associated to the second-stage states... (there is only a single action possible in stage 2)
Q <- array(0.0,dim=c(length(states_2),ntrial+1)) # array of tables with values of all cues and actions for 100 trials
# Randomly initialize Q values for the first trial
Q[,1] <- rnorm(dim(Q)[1],0,.001)

count11 <- 0 # counter for state2 = 1 following act1 = 1
count12 <- 0 # counter for state2 = 1 following act1 = 2
count21 <- 0 # counter for state2 = 2 following act1 = 1
count22 <- 0 # counter for state2 = 2 following act1 = 2
p_state2_a1 <- rbind(c(0.5,0.5),c(.5,.5))
p_state2_a2 <- rbind(c(0.5,0.5),c(.5,.5))

# Learning
for(t in 1:ntrial) {
  
  # Generate the first state randomly
  state1_idx <- sample(states_1[1:2],size=1)
  
  # determine expected rewards for the two actions
  Q_MB <- c(sum(p_state2_a1[state1_idx,]*Q[,t]), sum(p_state2_a2[state1_idx,]*Q[,t]))
  
  # determine MB action
  p_act <- exp(beta*Q_MB)/sum(exp(beta*Q_MB)) # probability of actions (softmax)
  act1_idx <- sample(actions_1,size=1,prob=p_act) # sample action with probabilities
  
  # Generate the reward, this is always 5 when choosing '1/left' and 10 when choosing '2/right'
  if (act1_idx == 1){
    state2_idx <- 1
    reward <- rew[t]
  } else {
    state2_idx <- 2
    reward <- 10 - rew[t]
  }
  
  # Counter for transition states. If the transitions correspond with the 'normal' transition it's +1, if they go opposite the counter is decreased
  # As there are no 'rare' transitions in this environment, the counter ends up at 200, which is equal to the amount of trials
  if (state1_idx == 1 && act1_idx == 1 && state2_idx == 1) {
    count11 <- count11 + 1
  }
  if (state1_idx == 1 && act1_idx == 1 & state2_idx == 2) {
    count11 <- count11 - 1
  }
  if (state1_idx == 1 && act1_idx == 2 && state2_idx == 1) {
    count12 <- count12 + 1
  }
  if (state1_idx == 1 && act1_idx == 2 && state2_idx == 2) {
    count12 <- count12 - 1
  }
  if (state1_idx == 2 && act1_idx == 1 && state2_idx == 1) {
    count21 <- count21 + 1
  }
  if (state1_idx == 2 && act1_idx == 1 & state2_idx == 2) {
    count21 <- count21 - 1
  }
  if (state1_idx == 2 && act1_idx == 2 && state2_idx == 1) {
    count22 <- count22 + 1
  }
  if (state1_idx == 2 && act1_idx == 2 && state2_idx == 2) {
    count22 <- count22 - 1
  }
  
  if(count11 > 0) {
    p_state2_a1[1,] <- c(0.9, 0.1)
  } 
  if(count11 < 0) {
    p_state2_a1[1,] <- c(0.1, 0.9)
  }
  if(count21 > 0) {
    p_state2_a1[2,] <- c(0.9, 0.1)
  } 
  if(count21 < 0) {
    p_state2_a1[2,] <- c(0.1, 0.9)
  }
  if(count11 == 0) {
    p_state2_a1[1,] <- c(0.5,0.5)
  }
  if(count21 == 0) {
    p_state2_a1[2,] <- c(0.5,0.5)
  }
  
  if(count12 > 0) {
    p_state2_a2[1,] <- c(0.9, 0.1)
  } 
  if(count12 < 0) {
    p_state2_a2[1,] <- c(0.1, 0.9)
  }
  if(count22 > 0) {
    p_state2_a2[2,] <- c(0.9, 0.1)
  } 
  if(count22 < 0) {
    p_state2_a2[2,] <- c(0.1, 0.9)
  }
  if(count12 == 0) {
    p_state2_a2[1,] <- c(0.5,0.5)
  }
  if(count22 == 0) {
    p_state2_a2[2,] <- c(0.5,0.5)
  }

  # Update Q, states are displayed on the left, actions on top in the Q tables, use plot(Q) for graph of progression of Q values
  Q[,t+1] <- Q[,t] # copy values for all actions (including the not chosen ones)
  Q[state2_idx,t+1] <- Q[state2_idx,t] + alpha*(reward - Q[state2_idx,t]) # update specifically for chosen action
  
}

plot(10 - rew, ylim=c(0,10))
lines(Q[2,])
points(rew,col="red")
lines(Q[1,],col="red")