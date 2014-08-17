# The MIT License (MIT)
#
# Copyright (c) 2012 Schaun Jacob Wheeler
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

amortize <- function(p_input = 25000, i_input = .10, n_months = 36, 
  output = "table", index = NULL) { 
  
  n_months <- rep(n_months, length(p_input))
  
  if(is.null(index)) {
    index <- matrix(rep(1:length(n_months), each = n_months[1]), 
      nrow = n_months[1])
  } else {
    index <- matrix(rep(index, each = n_months[1]), nrow = n_months[1])
  }
  
  p_input <- matrix(p_input, ncol = length(p_input))
  i_input <- matrix(i_input, ncol = length(i_input))
  i_monthly <- i_input / (12)
  payment <- p_input * i_monthly / (1 - (1 + i_monthly)^(-n_months[1]))
  
  Pt <- p_input # current principal or amount of loan
  currP <- NULL
  
  for(i in 1:n_months[1]) {
    H <- Pt * i_monthly # current monthly interest
    C <- payment - H # monthly payment minus monthly interest (principal paid for each month)
    Q <- Pt - C # new balance of principal of loan
    Pt <- Q # loops through until balance goes to zero
    currP <- rbind(currP, Pt)    
  }
  
  amortization <- rbind(p_input, currP[1:(n_months[1]-1),, drop = FALSE])
  monthly_principal <- amortization - currP
  monthly_interest <- rbind(
    (matrix(
      rep(payment, n_months[1]), 
      nrow = n_months[1], 
      byrow = TRUE) - monthly_principal)[1:(n_months[1]-1),, drop = FALSE],
    rep(0, length(n_months)))
  monthly_interest[1:nrow(monthly_interest) %% 12 == 0] <-
    monthly_principal[1:nrow(monthly_interest) %% 12 == 0] * i_monthly
  monthly_payment <- monthly_principal + monthly_interest
  installment <- matrix(rep(1 : n_months[1], length(n_months)), 
    nrow = n_months[1])
  
  input <- list(
    "amortization" = amortization,
    "payment" = monthly_payment,
    "principal" = monthly_principal,
    "interest" = monthly_interest,
    "installment" = installment,
    "index" = index)
  
  out <- switch(output, 
    "list" = input,
    "table" = as.data.frame(
      lapply(input, as.vector), 
      stringsAsFactors = FALSE),
    "balance" = as.data.frame(
      lapply(input[c("index", "amortization")], as.vector), 
      stringsAsFactors = FALSE),
    "payment" = as.data.frame(
      lapply(input[c("index", "payment")], as.vector), 
      stringsAsFactors = FALSE),
    "principal" = as.data.frame(
      lapply(input[c("index", "principal")], as.vector), 
      stringsAsFactors = FALSE), 
    "interest" = as.data.frame(
      lapply(input[c("index", "interest")], as.vector), 
      stringsAsFactors = FALSE)
  )
  
  out
}