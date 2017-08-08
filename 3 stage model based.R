# This is a Sarsa RL model to compute the optimal choiches in a multi-dimensional game
# There are two starting states, 2 layers, 4 total states and 4 rewards 
# In each state there are two options. The two options lead deterministically to one of the two pay-offs
# The pay-offs are static

# Libraries
library(truncnorm)
library(ggplot2)
library(plotly)

# Variables
ntrial <- 200 # Total number of trials

# Reward randomizer
min_reward <- 0
max_reward <- 10

rew <- rep(0.0,ntrial)
rew[1] <- runif(1,min_reward,max_reward)
for(t in 2:ntrial) {
  rew[t] <- rtruncnorm(1,mean=rew[t-1],sd=.5,a=min_reward,b=max_reward)
}


# Environment of the model
states_1 <- 1:2 # IDs of the states in stage 1, '1' corresponds to 'State 1', '2' corresponds to 'State 2'
actions_1 <- 1:4 # IDs of the actions in stage 1, '1' corresponds to 'Left', '2' corresponds to 'Right'
states_2 <- 3:6  # IDs of the states in stage 2, '3' corresponds to 'State 3', '4' corresponds to 'State 4' etc.
actions_2 <- 5:12 # IDs of the actions in stage 2, '1' corresponds to 'Left, '2' corresponds to 'Right'
states_3 <- 7:10 # IDs of the states in stage 2, '7' corresponds to 'State 7', '8' corresponds to 'State 8'

# SARSA learning
# Control parameters
alpha <- .2 # learning rate
beta <- 0.5 # softmax inverse temperature
# Storing the Q values; we need only learn the rewards associated to the second-stage states... (there is only a single action possible in stage 2)
Q <- array(0.0,dim=c(length(states_3),ntrial+1)) # array of tables with values of all cues and actions for 100 trials
# Randomly initialize Q values for the first trial
Q[,1] <- rnorm(dim(Q)[1],0,.001)

count31 <- 0 # counter for state3 = 3 following act1 = 1
count32 <- 0 # counter for state3 = 3 following act1 = 2
count41 <- 0 # counter for state3 = 4 following act1 = 1
count42 <- 0 # counter for state3 = 4 following act1 = 2

p_state3_a1 <- rbind(c(0.5,0.5),c(.5,.5))
p_state3_a2 <- rbind(c(0.5,0.5),c(.5,.5))
p_state3_a3 <- rbind(c(0.5,0.5),c(.5,.5))
p_state3_a4 <- rbind(c(0.5,0.5),c(.5,.5))

p_state78_a1 <- rbind(c(.9,.1),c(.9,.1))
p_state78_a2 <- rbind(c(.9,.1),c(.9,.1))
p_state910_a3 <- rbind(c(.9,.1),c(.9,.1))
p_state910_a4 <- rbind(c(.9,.1),c(.9,.1))
p_state78_a5 <- rbind(c(.9,.1),c(.9,.1))
p_state78_a6 <- rbind(c(.9,.1),c(.9,.1))
p_state910_a7 <- rbind(c(.9,.1),c(.9,.1))
p_state910_a8 <- rbind(c(.9,.1),c(.9,.1))


# Learning
for(t in 1:ntrial) {
  
  # Generate the first state randomly
  state1_idx <- sample(states_1[1:2],size=1)
  
  # determine expected rewards for the two actions, which is the max expected reward at the next stage times the transition probability
  Q_MB <- rep(0,4)
  Q_MB[1] <- max(p_state3_a1[1]*Q[1,t])+max(p_state3_a1[3]*Q[2,t])
  Q_MB[2] <- max(p_state3_a2[1]*Q[1,t])+max(p_state3_a2[3]*Q[2,t])
  Q_MB[3] <- max(p_state3_a3[1]*Q[3,t])+max(p_state3_a4*Q[4,t])
  Q_MB[4] <- max(p_state3_a4[1]*Q[3,t])+max(p_state3_a3*Q[4,t])
  
  
  if(state1_idx == 1) {
    Q_tmp <- c(Q_MB[1:2])
    p_act <- c(exp(beta*Q_tmp)/sum(exp(beta*Q_tmp)),0,0) # probability of actions (softmax)
  } else {
    Q_tmp <- Q_MB[3:4]
    p_act <- c(0,0,exp(beta*Q_tmp)/sum(exp(beta*Q_tmp))) # probability of actions (softmax)
  }
  act1_idx <- sample(actions_1,size=1,prob=p_act) # sample action with probabilities
  
  
  # ACTION & REWARDS STAGE 2
  # Generate the reward, this is always 5 when choosing '1/left' and 10 when choosing '2/right'
  if (act1_idx == 1){
    state2_idx <- 3
    reward <- 0
  }
  if (act1_idx == 2){
    state2_idx <- 4
    reward <- 0
  } 
  if (act1_idx == 3){
    state2_idx <- 5
    reward <- 0
  } 
  if (act1_idx == 4){
    state2_idx <- 6
    reward <- 0
  } 
  
  #ACTIONS STAGE 3
  # determine expected rewards for the two actions
  Q_MB <- rep(0,8)
  Q_MB[1] <- sum(p_state78_a1*Q[1:2,t])
  Q_MB[2] <- sum(p_state78_a2*Q[1:2,t])
  Q_MB[3] <- sum(p_state910_a3*Q[3:4,t])
  Q_MB[4] <- sum(p_state910_a4*Q[3:4,t])
  Q_MB[5] <- sum(p_state78_a5*Q[1:2,t])
  Q_MB[6] <- sum(p_state78_a6*Q[1:2,t])
  Q_MB[7] <- sum(p_state910_a7*Q[3:4,t])
  Q_MB[8] <- sum(p_state910_a8*Q[3:4,t])
  
  if(state2_idx == 3) {
    Q_tmp <- Q_MB[1:2]
    p_act <- c(exp(beta*Q_tmp)/sum(exp(beta*Q_tmp)),0,0,0,0,0,0) # probability of actions (softmax)
  }
  if(state2_idx == 4) {
    Q_tmp <- Q_MB[3:4]
    p_act <- c(0,0,exp(beta*Q_tmp)/sum(exp(beta*Q_tmp)),0,0,0,0) # probability of actions (softmax)
  }
  if(state2_idx == 5) {
    Q_tmp <- Q_MB[5:6]
    p_act <- c(0,0,0,0,exp(beta*Q_tmp)/sum(exp(beta*Q_tmp)),0,0) # probability of actions (softmax)
  }
  if(state2_idx == 6) {
    Q_tmp <- Q_MB[7:8]
    p_act <- c(0,0,0,0,0,0,exp(beta*Q_tmp)/sum(exp(beta*Q_tmp))) # probability of actions (softmax)
  }
  act2_idx <- sample(actions_2,size=1,prob=p_act) # sample action with probabilities
  
  
  # REWARDS STAGE 3
  if (state2_idx == 3 && act2_idx == 5 || state2_idx == 5 && act2_idx == 9) {
    state3_idx <- 1
    rewards <- rew[t]
  }
  if (state2_idx == 3 && act2_idx == 6 || state2_idx == 5 && act2_idx == 10) {
    state3_idx <- 2
    rewards <- 10 - rew[t]
  }
  if (state2_idx == 4 && act2_idx == 7 || state2_idx == 6 && act2_idx == 11) {
    state3_idx <- 3
    rewards <- rew[t] - 2
  }
  if (state2_idx == 4 && act2_idx == 8 || state2_idx == 6 && act2_idx == 12) {
    state3_idx <- 4
    rewards <- 2 - rew[t]
  }
  
  
  # TRANSITION STATES STAGE 3
  if (state2_idx == 3 && act2_idx == 5 && state3_idx == 1 || state2_idx == 5 && act2_idx == 9 && state3_idx == 1) {
    count31 <- count31 + 1
  }
  if (state2_idx == 3 && act2_idx == 5 && state3_idx != 1 || state2_idx == 5 && act2_idx == 9 && state3_idx != 1) {
    count31 <- count31 - 1
  }
  if (state2_idx == 3 && act2_idx == 6 && state3_idx == 2 || state2_idx == 5 && act2_idx == 10 && state3_idx == 2) {
    count32 <- count32 + 1
  }
  if (state2_idx == 3 && act2_idx == 6 && state3_idx != 2 || state2_idx == 5 && act2_idx == 10 && state3_idx != 2) {
    count32 <- count32 - 1
  }
  if (state2_idx == 4 && act2_idx == 7 && state3_idx == 3 || state2_idx == 6 && act2_idx == 11 && state3_idx == 3) {
    count41 <- count41 + 1
  }
  if (state2_idx == 4 && act2_idx == 7 && state3_idx != 3 || state2_idx == 6 && act2_idx == 11 && state3_idx != 3) {
    count41 <- count41 - 1
  }
  if (state2_idx == 4 && act2_idx == 8 && state3_idx == 4|| state2_idx == 6 && act2_idx == 12 && state3_idx == 4)  {
    count42 <- count42 + 1
  }
  if (state2_idx == 4 && act2_idx == 8 && state3_idx != 4|| state2_idx == 6 && act2_idx == 12 && state3_idx != 4) {
    count42 <- count42 - 1
  }
  
  
  # LEARNED TRANSITION STATES
  if(count31 > 0) {
    p_state3_a1[1,] <- c(0.9, 0.1)
    p_state3_a3[1,] <- c(0.9, 0.1)
  } 
  if(count31 < 0) {
    p_state3_a1[1,] <- c(0.1, 0.9)
    p_state3_a3[1,] <- c(0.1, 0.9)
  }
  if(count41 > 0) {
    p_state3_a1[2,] <- c(0.9, 0.1)
    p_state3_a3[2,] <- c(0.9, 0.1)
  } 
  if(count41 < 0) {
    p_state3_a1[2,] <- c(0.1, 0.9)
    p_state3_a3[2,] <- c(0.1, 0.9)
  }
  if(count31 == 0) {
    p_state3_a1[1,] <- c(0.5,0.5)
    p_state3_a3[1,] <- c(0.5,0.5)
  }
  if(count41 == 0) {
    p_state3_a1[2,] <- c(0.5,0.5)
    p_state3_a3[2,] <- c(0.5,0.5)
  }
  
  if(count32 > 0) {
    p_state3_a2[1,] <- c(0.9, 0.1)
    p_state3_a4[1,] <- c(0.9, 0.1)
  } 
  if(count32 < 0) {
    p_state3_a2[1,] <- c(0.1, 0.9)
    p_state3_a4[1,] <- c(0.1, 0.9)
  }
  if(count42 > 0) {
    p_state3_a2[2,] <- c(0.9, 0.1)
    p_state3_a4[2,] <- c(0.9, 0.1)
  } 
  if(count42 < 0) {
    p_state3_a2[2,] <- c(0.1, 0.9)
    p_state3_a4[2,] <- c(0.1, 0.9)
  }
  if(count32 == 0) {
    p_state3_a2[1,] <- c(0.5,0.5)
    p_state3_a4[1,] <- c(0.5,0.5)
  }
  if(count42 == 0) {
    p_state3_a2[2,] <- c(0.5,0.5)
    p_state3_a4[2,] <- c(0.5,0.5)
  }
  
  # Update Q, states are displayed on the left, actions on top in the Q tables, use plot(Q) for graph of progression of Q values
  Q[,t+1] <- Q[,t] # copy values for all actions (including the not chosen ones)
  Q[state3_idx,t+1] <- Q[state3_idx,t] + alpha*(rewards - Q[state3_idx,t]) # update specifically for chosen action
  
}

plot(10 - rew, xlim=c(0,200), ylim=c(-1,11))
lines(Q[2,])
points(rew,col="red")
lines(Q[1,],col="red")
points(rew-2, col="blue")
lines(Q[3,],col="blue")
points(8 - rew, col="green")
lines(Q[4,],col="green")