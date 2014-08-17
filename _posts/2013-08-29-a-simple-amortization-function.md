---
title: A simple amortization function
author: Schaun Wheeler
layout: post
permalink: /2013/08/29/a-simple-amortization-function/
categories:
  - Analysis
  - Uncategorized
tags:
  - amortization
  - R
  - vectorization
---
I was working on a project yesterday where I needed to amortize out a bunch of loans to calculate the total interest a borrower would pay if he or she paid the minimum monthly payment for the full term of the loan. I couldn&#8217;t find any package in R that already contained the necessary math, so I looked around and found [this post][1] as well as [this one][2]. They both presented the R code to do the basic math involved in amortization, but each function was built to handle only one loan at a time. I had well over 100,000 loans I needed to go through, and loops aren&#8217;t all that efficiently implemented in R.<!--more-->

So I revised the code to perform that math on all of the loans at once by organizing everything into matrices that could then be added, subtracted, etc. It only took a little over three seconds to amortize 110,335 loans. I don&#8217;t know how long it would have taken to amortize each loan individually &#8211; I killed the process after I got tired of waiting for it to finish.

The function takes the following parameters:

*   **p_input**: the initial principal owed on the loan
*   **i_input**: the interest rate
*   **n_months**: the length of the loan term, in months
*   **output**: format of the output; &#8220;list&#8221; returns a list of full amortization tables (balance, payment, principal, interest, and installment for each month); &#8220;table&#8221; combines all the individual tables into one and differentiates loans by a separate index column; &#8220;balance&#8221;, &#8220;payment&#8221; &#8220;principal&#8221;, and &#8220;interest&#8221; return only those columns
*   **index**: an id number or other unique identifier for each loan; if not supplied, the loans are just numbered

{% highlight r linenos %}
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
{% endhighlight %}

 [1]: http://www.r-bloggers.com/mortgage-calculator-and-amortization-charts-with-r/
 [2]: http://biostatmatt.com/archives/895
