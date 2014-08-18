---
title: Some helps for running and evaluating Bayesian regression models
author: Schaun Wheeler
layout: post
permalink: /2012/09/21/some-helps-for-running-and-evaluating-bayesian-regression-models/
jabber_published:
  - 1348260283
publicize_reach:
  - 'a:3:{s:7:"twitter";a:1:{i:1566504;i:8;}s:2:"fb";a:1:{i:664462;i:207;}s:2:"wp";a:1:{i:0;i:35;}}'
email_notification:
  - 1348260285
categories:
  - Analysis
tags:
  - Bayesian
  - code
  - mcmc
  - R
  - statistics
  - systematic analytic methods
---
Around two years ago, I suddenly realized my statistical training had a great big Bayes-shaped hole in it. My formal education in statistics was pretty narrow – I got my degree in anthropology, a discipline [not exactly known][1] for its rigorously systematic analytic methods. I learned the basics of linear models and principal components analysis and was [mercifully spared][2] too much emphasis on ANOVAs and chi-squares and other “tests.” I developed a large portion of my statistical skills while working for the Department of the Army…not because the Army is really into rigorous analysis (see [here][3] and [here][4] and [here][5]), but because a co-worker introduced me to [R][6]. (I’m convinced the best way to learn statistics is to get a minimalist introduction – just enough to avoid being intimidated by the jargon – and then devote a few months to doing two or three projects in R.) During all of this, I kind of knew there was a thing called Bayesian statistics out there, but I’d never really looked into it and didn’t have strong opinions about it.<!--more-->

That all changed. Through a lot of experiences I won’t detail here, I came to the view that p-values were pretty silly things to focus on, which view eventually turned into near-total disillusionment with the entire concept of statistical significance as it used in the context of null-hypothesis testing (see [here][7] for more). I can appreciate that that stuff has its uses when certain assumptions are met, but I don’t happen to be interested in any situations where those assumptions are very realistic.

I then happened upon Sharon McGrayne’s fun little read, [*The Theory that Would Not Die*][8]. I read it because I had the time and because it seemed like an interesting subject, but the book gave me enough information about Bayesian approaches to nudge me out of being complacent in my ignorance. I started looking for some resources on Bayesian statistics that were geared towards practical application rather than the underlying mathematics (I really enjoy the application part, and in most cases I’m content to trust other people that the math part has been taken care of pretty well). I came across John Kruschke’s book, [*Doing Bayesian Data Analysis*][9]. By the end of the first chapter, I was very interested. By the end of chapter 11, I was really mad that no one had ever told me about this stuff before. By the end the entire book, there was no turning back.

R has a lot of [resources][10] for doing all kinds of Bayesian stuff, but it seems that, traditionally, the main tool for doing Bayesian modeling has been [BUGS][11], which can be accessed through R using various packages such as [R2WinBugs][12], and more recently [JAGS][13], which can be called through packages such as [R2Jags][14]. But two things kept me off the BUGS/JAGS route.

First, they have their own syntax – the way you specify a regression model in nearly every R package is not the way you specify a model in BUGS/JAGS. That’s not the fault of those programs – they weren’t designed to be R add-ons. It’s just that my list of syntaxes to learn is pretty long, and BUGS/JAGS syntax is not very high on that list. In the amount of time it would take me to learn BUGS syntax well I could learn a little Java or Python syntax and still get (in my opinion) a much greater return on my investment. But besides the syntax issue, BUGS and JAGS are known for being pretty slow. That’s not a bad thing in and of itself – some things just take time to do – but if a faster option exists that doesn’t require me to learn new syntax, that leaves me little reason to choose the slower tools.

So I was happy when I came across the [MCMCglmm][15] package. I was already familiar with generalized linear mixed-effects models (GLMMs), the syntax was very similar to what is used in other standard R functions such as glm() and the [lme4][16] package’s glmer(), and [according][17] to comparisons run by MCMCglmm author Jarrod Hadfield, “on a 2.5Ghz dual core MacBook Pro with 2GB RAM, MCMCglmm took 7.6 minutes and WinBUGS took 4.8 hours to fit the [same] model.” Most of my projects have short deadlines, so 8 minutes looked a whole lot better than 5 hours.

I’ve used MCMCglmm for several projects, most recently a few analyses to inform decisions about market segmentation, and while I’m generally happy with it there are a few little things and one really, really big thing that I would like to be different. The little things have to do with defaults – I want to have options for default [priors][18], because they’re useful and save time when exploring, and I don’t like the default of not saving the estimates for [random effects][19] when modeling and [marginalizing][20] across all random effects when predicting.

But like I said, those are really small things. It’s not hard to change the settings from the defaults. What I really, really don’t like is that the predict function for MCMCglmm can’t handle new data. I can run a model and then use the predict() function to get calculations of what the model says each of the original data points ought to be, but I can’t feed it a new set of data containing the same predictor variables as were used in the original model and have the model estimate what the response variable ought to be for those data points. I’m not blaming the package’s author for this shortcoming. It’s R: I’m already getting tons more than I pay for. I’m sure he’ll get around to doing it eventually. But for right, now, I need to be able to predict new data.

I mainly need that capability is for cross validation. There are many ways of evaluating a model. Most of the ways I see tend to focus on individual parameters instead of the model as a whole. It’s already very easy to get estimates of how much confidence a parameter estimate warrants and things like that. And it’s easy to see how well the model fits the data used to construct the model – but that’s the problem: while it’s better than nothing, it’s not a very rigorous measure of a model’s performance to see how well it post-dicts the data that were used to train the model in the first place. That’s where cross-validation comes in handy – randomly exclude a small portion of your data, build the model based on the larger portion, and then see how well the model predicts the omitted smaller portion. It’s a pretty straightforward way to see how much the model [diverges from reality][21].

So I finally made some time to write some functions, most of them just tweaking the MCMCglmm functions, to allow me to cross-validate my models. You can find and/or edit the source code [here][22] and can load all the functions in R by entering:

[sourcecode language="r"]  
source("https://raw.github.com/schaunwheeler/tmt/master/R/mcmcglmm.R")  
[/sourcecode]

For right now, I’m calling the set of functions mcmcglmm (all lowercase letters) because they’re really just a modification of the MCMCglmm functions, which are doing all the heavy lifting.

To start, I wrote a quick function called SplitData() that takes a data frame and splits it into a large subset and a small subset, so the large part can be used to fit the model and the small part can be used for cross validation.

[sourcecode language="r"]  
SplitData <- function(data, percent = .8, ignore = NULL){

facs <- sapply(data,is.factor)  
data[,facs] <- lapply(data[,facs],as.character)  
chars <- sapply(data,is.character)  
ignore <- colnames(data) %in% ignore  
look <- chars & !ignore

num <- round(nrow(data) * percent, 0)  
rows <- sample(1:nrow(data), num)  
rowind <- 1:nrow(data) %in% rows

big <- data[rowind,]  
small <- data[!rowind,]

bigind <- 1:nrow(big)  
smallind <- 1:nrow(small)

bigvals <- rep(NA,ncol(big))  
smallvals <- rep(NA,ncol(small))  
bigvals[look] <- lapply(big[,look],function(x)sort(unique(x)))  
smallvals[look] <- lapply(small[,look],function(x)sort(unique(x)))

matches <- lapply(1:length(smallvals),  
function(x)smallvals[[x]] %in% bigvals[[x]])  
misses <- which(sapply(matches, function(x)1-mean(x)) > 0)  
missvals <- lapply(1:length(smallvals),  
function(x)smallvals\[[x]\]\[!(smallvals[[x\]] %in% bigvals[[x]])])

if(length(misses) > 0){  
for(i in misses){  
for(j in 1:length(missvals[[i]])){  
pulls <- smallind\[small[,i] == missvals[[i]\]\[j\]]  
take <- ifelse(length(pulls) == 1, pulls,  
try(sample(pulls, 1), silent = T))  
if(is.numeric(take)){  
big <- rbind(big,small[take,])  
small <- small[-take,]  
}  
}  
}  
}

list("large" = big,  
"small" = small)  
}  
[/sourcecode]

The default is to keep 80% of the original data for the model fitting. The function splits the data into the specified proportions, and then checks to see if the smaller subset has variable options not included in the bigger portion. It could be a problem if you trained a model with country-level predictors for the U.S., Russia, China, and Australia, and then tried to cross validate the prediction on data that included Argentina as a country option. SplitData() makes sure that if any subset is going to include variable options that the other one doesn’t, it’s going to be the bigger subset. So:

[sourcecode language="r"]  
df <- as.data.frame(matrix(rnorm(200),ncol=2))  
df$F1 <- sample(LETTERS[1:3],100, replace = T)  
df$F2 <- sample(LETTERS[4:5],100, replace = T)  
df <- rbind(df,c(0,0,"X","Y"))  
df$V1 <- as.numeric(df$V1)  
df$V2 <- as.numeric(df$V2)

table(as.data.frame(t(sapply(1:1000,function(&#8230;)sapply(SplitData(df),nrow)))))

small  
large  19  20  
81   0 824  
82 176   0  
[/sourcecode]

So I created a data set with 101 rows and four columns. The first two rows were numeric and the last two were categorical – the first categorical variable included a random sample of A’s, B’s, and C’s and then had one X in the last row. The second categorical variable included a random sample of D’s and E’s and then had one Y in the last row. I ran SplitData() 1000 times on that data set and, as you can see, approximately 80% of the time, the X and Y row ended up in the bigger subset – with 81 variables in that subset and 20 variables in the smaller subset. About 20% of the time, the X and Y row ended up in the smaller subset, and was therefore moved to the larger subset.

All the rest of the functions either wrap, modify, or take input from a call to MCMCglmm().

The mcmcglmm() function takes all the same inputs as the function it wraps, but it starts by evaluating all discrete variables in the data set and recording what the range of possible values was for each variable. It inserts that list, called “datalevels”, into the model output at the end of the function. Most of the wrapper is devoted to creating default priors. The function allows for two variants of two default priors on the covariance matrices. The two defaults are “InvW” for an inverse-Wishart prior, which sets the degrees of freedom parameter equal to the dimension of each covariance matrix, and “InvG” for an inverse-Gamma prior, which sets the degrees of freedom parameter to 0.002 more than one less than the dimensions of the covariance matrix. &#8220;-pe&#8221; can be added to the call for either of these priors to use parameter expansion (see section 5.2 of [this][23]). For more specific prior specification, you can just feed a list to the “prior” argument, as explained in the pretty extensive (for R) MCMCglmm [documentation][24].

I also wrote a little function called QuickSummary() that brings together most of my preferred methods for assessing individual parameters. Given the model output, the function calculates the posterior mean, the highest posterior density intervals for a given probability (set through the &#8220;prob&#8221; option), the &#8220;type S&#8221; error (probability that the estimate actually is of the opposite sign of the posterior mean), and the &#8220;type M&#8221; error (probability that the estimate is the same sign but substantially smaller than the posterior mean – this defaults to measuring the probability that the estimate is less than one half the size of the mean). The function also allows for rounding of the output for convenience. It defaults to four decimal places.

But the real work was with the predict.MCMCglmm function. I couldn’t just make a wrapper for this function, partially because I had to insert the new data into specific parts of the function, and partly because as the predict.MCMGlmm function is currently written, this happens:

[sourcecode language="r"]  
predict(model,newdata=df2)  
Error in predict.MCMCglmm(model, newdata = df2) :  
sorry newdata not implemented yet  
In addition: Warning message:  
In predict.MCMCglmm(model, newdata = df2) :  
predict.MCMCglmm is still developmental &#8211; be careful  
[/sourcecode]

So I had to go in and take out the line that stops the function whenever new data is inserted. I also removed the warning statement about the function being development (I’m tired of seeing it) and changed the marginalization defaults. After that, there was the matter of creating [design matrices][25] for the new data that matched the design matrices used in the original model. When just fitting the original data, that’s easy:

[sourcecode language="r"]  
object$Sol <- object$Sol[, c(1:object$Fixed$nfl, object$Fixed$nfl +  
keep), drop = FALSE]  
W <- cBind(object$X, object$Z)  
W <- W[, c(1:object$Fixed$nfl, object$Fixed$nfl + keep),  
drop = FALSE]  
[/sourcecode]

“Object” is the placeholder for the model output in general and the “Sol” is a list of the [MCMC][26] estimates for each predictor, while “X” is the design matrix for the fixed effects and “Z” is the design matrix for the random effects.  So in normal data fitting, the predict function just puts the two design matrices together and then cuts the simulation output and combined design matrix to only keep those variables that were not marginalized. So the MCMCglmm() function did all the hard work already. That’s not the case with new data:

[sourcecode language="r"]  
if(!is.null(newdata)){  
chars <- sapply(newdata,is.character)  
newdata[,chars] <- lapply(newdata[,chars],as.factor)

vars.o <- paste(as.character(object$Fixed[[1]]),  
as.character(object$Random[[1]]), collapse = " ")  
vars.o <- gsub("~|(us|idh|cor)\(|[+]|\):|\b1\b"," ", vars.o)  
vars.o <- unlist(strsplit(vars.o, split = "\s+"))  
vars.o <- unique(vars.o[vars.o != ""])  
if(any(vars.o %in% colnames(newdata)) == F){  
stop("&#8217;newdata&#8217; is missing variables needed for the model")  
}

facs <- sapply(newdata,is.factor)  
facs.o <- vars.o[facs]

for(i in 1:length(facs.o)){  
newdata[,facs.o[i]] <- factor(newdata[,facs.o[i]],  
levels=sort(unique(c(levels(newdata[,facs.o[i]]),  
object$datalevels[[facs.o[i]]]))),  
labels = object$datalevels[[facs.o[i]]])  
}

fixef <- sparse.model.matrix(object$Fixed[[1]], newdata)  
rterms <- split.direct.sum(as.character(object$Random[[1]])[2])

ranef <- lapply(rterms,function(x, df = newdata){  
covms <- grepl("\w{2,3}\([[:print:]]+\):",x)

ints <- grepl("\w{2,3}\((1 [+])?([[:print:]]+)\):([[:print:]]+)", x)

if(covms == T & ints == T){  
full <- sparse.model.matrix(as.formula(  
gsub("\w{2,3}\(1 \[+\] ([[:print:]]+)\):([[:print:]]+)",  
"~ 0 + \1 : \2", x)),df)

binary <- full!=0  
matching <- vector("logical",length(colnames(df)))

for(j in 1:length(colnames(df))){  
matching[j] <- grepl(paste(":",colnames(df)[j],sep=""), x)  
}

matchvar <- colnames(df)[matching]  
firstvar <- gsub("\w{2,3}\(1 \[+\] ([[:print:]]+)\):([[:print:]]+)",  
"\1", x)

colnames(binary) <- paste(matchvar, "(Intercept)", matchvar,  
sort(object$datalevels[[matchvar]]),sep=".")

colnames(full) <- paste(matchvar, firstvar, matchvar,  
sort(object$datalevels[[matchvar]]),sep=".")

out <- cBind(binary,full)  
}

if(covms == T & ints == F){  
full <- sparse.model.matrix(as.formula(  
gsub("\w{2,3}\(([[:print:]]+)\):([[:print:]]+)",  
"~ 0 + \1 : \2", x)),df)

matching <- vector("logical",length(colnames(df)))

for(j in 1:length(colnames(df))){  
matching[j] <- grepl(paste(":",colnames(df)[j],sep=""), x)  
}

matchvar <- colnames(df)[matching]  
firstvar <- gsub("\w{2,3}\(1 \[+\] ([[:print:]]+)\):([[:print:]]+)",  
"\1", rterms[i])

colnames(full) <- paste(matchvar, firstvar, matchvar,  
sort(unique(as.character(object$datalevels[[matchvar]]))),  
sep=".")  
out <- full  
}

if(covms == F & ints == F){  
matchvar <- colnames(df)[colnames(df) %in% x]  
full <- sparse.model.matrix(as.formula(paste("~ 0 +", x, sep= "")),df)

colnames(full) <- paste(x,sort(unique(as.character(object$datalevels[[matchvar]]))),  
sep=".")  
out <- full  
}  
out  
})

ranef <- do.call("cBind",ranef)

Wn <- cBind(fixef,ranef)

object$X <- fixef[,match(colnames(object$X),colnames(fixef))]  
object$Z <- ranef[,match(colnames(object$Z),colnames(ranef))]  
object$error.term <- object$error.term[1:nrow(Wn)]

W <- Wn[,match(colnames(W),colnames(Wn))]  
W <- W[, c(1:object$Fixed$nfl, object$Fixed$nfl + keep),  
drop = FALSE]  
}  
[/sourcecode]

MCMCglmm specifies predictors in several different ways. If wrapped in a us(), idh(), or cor() function (among others), a predictor in the random-effects formula represents a covariance matrix, and therefore each level of that variable gets a column in the design matrix (if the variable is discrete). But if the variable in the function is discrete, that represents a random-slope specification and gets only one column. But if the function contains a “1 + {variable}”, that indicates a random intercept and random slope specification that gets two columns. So most of the stuff I added pulls apart the model formulas and matches up the pieces with types of specifications and then constructs the appropriate number of columns by referencing the “datalevels” list that mcmcglmm() added to the MCMCglmm() output. All of this leads up to the new data design matrices replacing the old data design matrices, all of which is wrapped up in an object “W”, is the name of the object used by the original predict.MCMCglmm function to do the rest of the prediction.

The only other part I changed was, I think, an error in the original code. For example, this happens with the original function:

[sourcecode language="r"]  
df <- as.data.frame(matrix(rnorm(20),ncol=2))  
df$F1 <- sample(LETTERS[1:3],10, replace = T)  
df$F2 <- sample(LETTERS[4:5],10, replace = T)

model <- mcmcglmm(V1~V2+F2,random=~us(1+V2):F1+F2,pr=T,data=df)

predict(model,interval="prediction",marginal=~F2)  
Error in vpred[, cnt][which(object$error.term == i & object$error.term ==  :  
subscript out of bounds  
[/sourcecode]

The original function only breaks when you try to do a posterior predictive check – simulating draws from the posterior distribution instead of just calculating estimates based on parameter means – at the same time that you try to marginalize some but not all of the random variables. Even when not marginalizing, I noticed in practice that the credibility intervals for the posterior predictions were much larger than I expected. It looks like a couple lines of code inadvertently cut the the random-effects design matrix incorrectly, duplicating some columns and leaving others out. That not only messes us the predictions but also, when marginalizing some but not all random variables, creates matrices that don’t make sense given subsequent subscript calls. So I fixed that. So here’s how the new function compares. Assuming the same 20-row data frame and mcmcglmm() call that I showed in the last code snippet, and assuming no marginalization, here is what the original predict.MCMCglmm does:

[sourcecode language="r"]  
predict(model,marginal=NULL)  
[,1]  
1  -0.93093304  
2  -0.14137582  
3   0.78776897  
4   0.46296440  
5   0.75096633  
6   0.10049595  
7   0.20339204  
8   0.17401375  
9  -0.06092788  
10  0.36310427Warning message:  
In predict.MCMCglmm(model) :  
predict.MCMCglmm is still developmental &#8211; be careful</pre>  
[/sourcecode]

And here’s PredictNew()

[sourcecode language="r"]  
PredictNew(model)  
[,1]  
1  -0.93093304  
2  -0.14137582  
3   0.78776897  
4   0.46296440  
5   0.75096633  
6   0.10049595  
7   0.20339204  
8   0.17401375  
9  -0.06092788  
10  0.36310427  
[/sourcecode]

And here’s PredictNew() passing the original data frame, but in reverse order, as a new data frame:

[sourcecode language="r"]  
PredictNew(model,newdata=df[10:1,])  
[,1]  
1   0.36310427  
2  -0.06092788  
3   0.17401375  
4   0.20339204  
5   0.10049595  
6   0.75096633  
7   0.46296440  
8   0.78776897  
9  -0.14137582  
10 -0.93093304  
[/sourcecode]

So the output of NewPredict() matches the output of predict.MCMCglmm, and passing new data gives predictions that match what they would have been if they had been the original data. Calculating confidence intervals also gives consistent results across both functions and with new data. Calculating estimates and intervals for posterior predictive checks aren’t the same, but there’s no way they could be, since they’re derived computationally instead of analytically.

So I’m pretty happy now with the tools I currently have for Bayesian modeling. I do wish I could use a scaled inverse-Wishart or separation strategy prior (see [here][27]) – if there’s a way to do that in MCMCglmm I haven’t figured it out – and the [Stan][28] program/package created by Andrew Gelman and others looks cool enough that it might actually entice me to learn BUGS-esque syntax, but for the time being I feel pretty ok about my regression tools.

 [1]: http://housesofstones.github.io/2012/09/06/why-should-we-believe-you-anthropology-and-public-interest/
 [2]: http://allendowney.blogspot.com/2011/05/there-is-only-one-test.html
 [3]: https://housesofstones.github.io/2012/09/12/feeling-ineffective-needing-the-haqqani-network-2/
 [4]: http://housesofstones.github.io/2012/03/19/maybe-we-dont-actually-know-what-we-think-we-know/
 [5]: http://housesofstones.github.io/2012/02/22/why-the-best-ideas-sometimes-dont-seem-very-good/
 [6]: http://www.r-project.org/
 [7]: http://www.indiana.edu/~kruschke/articles/Kruschke2010WIRES.pdf
 [8]: http://www.amazon.com/The-Theory-That-Would-Not/dp/0300169698
 [9]: http://www.indiana.edu/~kruschke/DoingBayesianDataAnalysis/
 [10]: http://cran.r-project.org/web/views/Bayesian.html
 [11]: http://www.mrc-bsu.cam.ac.uk/bugs/
 [12]: http://cran.r-project.org/web/packages/R2WinBUGS/index.html
 [13]: /Users/meinshausen/Downloads/mcmc-jags.sourceforge.net
 [14]: http://cran.r-project.org/web/packages/R2jags/index.html
 [15]: http://cran.r-project.org/web/packages/MCMCglmm/index.html
 [16]: http://cran.r-project.org/web/packages/lme4/index.html
 [17]: http://cran.r-project.org/web/packages/MCMCglmm/vignettes/Overview.pdf
 [18]: http://en.wikipedia.org/wiki/Prior_probability
 [19]: http://en.wikipedia.org/wiki/Random_effects
 [20]: http://en.wikipedia.org/wiki/Marginal_distribution
 [21]: http://housesofstones.github.io/2012/03/15/yes-all-models-are-wrongthat-totally-misses-the-point/
 [22]: https://github.com/schaunwheeler/mcmcglmm
 [23]: http://yaroslavvb.com/papers/gelman-parameterization.pdf
 [24]: http://cran.r-project.org/web/packages/MCMCglmm/vignettes/CourseNotes.pdf
 [25]: http://en.wikipedia.org/wiki/Design_matrix
 [26]: http://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo
 [27]: http://www.themattsimpson.com/2012/08/20/prior-distributions-for-covariance-matrices-the-scaled-inverse-wishart-prior/
 [28]: http://mc-stan.org/