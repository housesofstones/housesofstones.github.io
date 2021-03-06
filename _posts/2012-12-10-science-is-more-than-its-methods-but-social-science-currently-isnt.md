---
title: Science is more than its methods (but social science currently isn’t)
author: swheeler
layout: post
permalink: /2012/12/10/science-is-more-than-its-methods-but-social-science-currently-isnt/
jabber_published:
  - 1355153340
email_notification:
  - 1355153344
publicize_twitter_user:
  - SchaunW
categories:
  - Analysis
  - Assumptions
tags:
  - methods
  - social science
  - theory
---
Paul called my attention to [this piece][1] (behind a pay wall…of course), titled “The science in social science” and written by anthropologist H. Russell Bernard. When I was doing my graduate work at UCONN, we commonly referred to Bernard’s [Research Methods in Anthropology][2] as our “methods Bible,” so I went into his article with favorable expectations. Unfortunately, I think he engaged in some logical leaps that I just can’t make. From his abstract:<!--more-->

> A recent poll showed that most people think of science as technology and engineering—life-saving drugs, computers, space exploration, and so on. This was, in fact, the promise of the founders of modern science in the 17th century. It is less commonly understood that social and behavioral sciences have also produced technologies and engineering that dominate our everyday lives. These include polling, marketing, management, insurance, and public health programs.

This is similar to what Gary King has done in his presentation on “Quantitative Social Science”, as I discussed in a [recent post][3]. Both King and Bernard have taken instances where researchers have collected and analyzed information on people and then derived insights based on that research that ended up helping people make money or avoid conflict or more efficiently allocate resources, and have claimed those cases as examples of the ways in which social science has been successful.

I don’t deny that people have done some pretty cool things with information about people’s behavior. I just have a problem calling those cool things “social science” just by virtue of the fact that people’s behavior was the thing being studied. This is an issue on which I’m still trying to form a clear and coherent opinion, so let me try to walk through my reasoning.

On an intuitive level, there seems to be a difference between a set of principles that embody clear expectations about how some aspect of the world should work, and the instantiation of those principles in technologies. Maybe we could call the set of principles “scientific knowledge” and, following Bernard’s lead, refer to the instantiation of those principles as “scientific application” or “engineering.” The applications tend to work – meaning they tend to do what they are designed to do – because their ability to function depends on outcomes (reactions? events?&#8230;not sure what the best word would be) that happen consistently under certain conditions, and the applications themselves either create those conditions or take advantage of those conditions when they occur naturally. For example, [refrigerators][4] work because certain organic compounds react in a certain way to differences in pressure and heat, and because (most) refrigerators themselves create conditions conducive to those compounds reacting in the way needed to cool stuff.

The fuzzy middle ground between scientific knowledge and scientific application seems to be the area of systematic observation. If you observe something long enough and consistently enough, you can develop expectations about how what will happen next. Humans [do this intuitively][5], which is why we don’t constantly get surprised when people we know do all the things they normally do. When my three-year-old daughter pretends to not hear me when I tell her it’s time to brush her teeth, I don’t get surprised. I’ve seen her do that countless times before.

When it comes to research, I would lump both data collection and data analysis into this observation category, since many of the things researchers are interested in like trends or latent patterns by definition can’t be observed directly. A lot of what we call “analysis” seems to be just a way of observing things that we can’t see with our un-augmented senses, so in that sense a statistical analysis isn’t all that different from a microscope or any other piece of observational equipment used in the physical sciences. Most of the examples of “social science” Bernard gives in his article seem to be focused almost entirely on the observation part of the picture: people looked at stuff and noticed patterns and then acted on their observations.

True, acting on those observations certainly qualifies as “application”, but I’m not convinced we should call that science. I certainly don’t consider my parenting to be science, even though it involves a lot of pattern recognition. It seems to me that the criterion of [replicability][6] is the key here: if replicability is important, and I think it is, it’s because a replicable study can be repeated in lots of different situations, and from the standpoint of generating knowledge, the only reason I can think of that you would want or need to reproduce the same procedures in lots of different situations would be to discover patterns that occur generally. If a pattern occurs in one situation, it could be because that pattern pretty much always occurs under certain conditions and those conditions happened to be present in the original observational context. The only way to establish the generalizability of a pattern is to show that it actually occurs generally.

This generalizability of core principles is, to me, what differentiates science from plain-old pattern recognition, and it’s also what seems to be absent from Bernards’s (and King’s) examples of social science achievements.

Something that recently helped me clarify my thinking on this subject was this [blog post][7], provocatively titled “The surprisingly weak case for global warming.” The writer analyzed some climate data, using a random walk process as proxy for the null hypothesis, which might be stated roughly as “increases in the earths’ temperature do not represent a long-term trend.” If you read through the comments, and get past all the posturing and outrage that seems to typify climate research discussions, several people point out that the main problem with the writer’s findings is that global temperatures are not a random walk. Heat transfer happens a certain way based on the source of the heat, the receptivity of the heat’s target, filtering that happens in between, etc. When it comes to the sun and the earth, that transfer does not follow a random walk.

So the writer made a lot of systematic observations, but he interpreted them in terms of a model whose dynamics didn’t accurately reflect the dynamics of the system the model was supposed to represent. That seems to justify the assertion of some of the commenters that the methods didn’t have any obvious technical errors &#8211; the observation part of the writers activities was accurate – but the *science* was still wrong.

So, as much as I [hate to say it][8], theory is what seems to differentiate science from just-plain systematic observation. I hate to admit that because theory is so abused in the social sciences (and has often been treated quite poorly in the physical sciences as well). In social research publications, theory seems to refer, in many cases, to just the vague notion of having ideas about what things are important or what things influence what else. But really rigorous theory &#8211; scientific theory &#8211; specifies what the parts of the system are, defines which parts interact with which others, and lays out the mechanisms by which those interactions take place. It’s something that can be diagramed out as blocks connected by labeled arrows.

Once you have rigorous theory &#8211; and I think a decent rule of thumb for “rigor” is to ask whether you have defined the theory enough that you can specify it mathematically (or at least simulate it computationally) &#8211; that theory can inform how you decide what to observe, and how to decide to observe it. Some kinds of observations (for example, seeing how well a pattern approximates a random walk) aren’t appropriate given certain theories (for example, a system of heat transfer that isn’t accurately approximated by a random walk).

For the most part, disciplines traditionally considered part of social science haven’t really produced rigorous theory. If you don’t have a rigorous theoretical foundation to prescribe an appropriate course of action in your research, then it seems the appropriate course of action is to observe whatever you can whenever you can with as little regard to theory as possible. Then look for consistent patterns. Then employ a minimalist theory (say, access to resources and information, outcomes from past behavior, routinization, etc. – the kind of stuff for which there is already ample evidence for behavioral influence from the cognitive sciences) to try to interpret as much of as many of the patterns as you can. If that minimalist theory provides a plausible explanation for all of the observations, then you might cautiously try to get more rigorous observations of those theoretical categories along with the behavior to see if they really are as good a set of predictors as the original data mining seemed to indicate. If the minimalist theory leaves some observations unexplained, only then should you make an attempt to expand the theory, but only as much as is necessary to account for the observations.

I remember reading [a paper][9] a while ago about animals modifying their environments. The authors did a simulation that showed that if an organism had the ability to observe the outcomes of its own actions, and also the ability to modify the environment to flag situations in which certain outcomes took place, that organism was able to develop a useful internal representation (principles) of the environment where previously it had lacked that. I think the same thing could be true of theory in the social sciences. I don’t think we need theory in order to get better theory. In fact, for the social sciences that are so stuffed with bad philosophizing and punditry masquerading as theory, we might actually need less theory. We can develop it from systematic observation alone, even though that observation all by itself doesn’t deserve the designation of theory, or science.

The problem I have with Bernard’s and King’s characterizations of social science is that they show that systematic observations have taken place, then show that the results of that observation have been turned into different sorts of applications, and then show that those applications did some useful things, and then declare that social science made those useful things possible. They never make the connection to any core principles of scientific knowledge. They never show that the applications were useful because they operated on more accurate or reliable expectations about how the world works. That last ingredient is important, given the difficulty social scientists have had demonstrating that they actually know what they’re talking about ([discussion][10], [discussion][11], [example][12], [examples with discussion][13]).

I am all for systematic observation and analysis. And I’m very much in favor of [making decisions][14] based on observation and analysis. I think all the examples Bernard and King give are great illustrations of the ways we can do good and useful things based on systematic research. But the only way to attribute those successes to social science is to show that social science embodies a set of principles – not just analytic practices &#8211; that consistently improve our ability to maintain realistic expectations about the world.

 [1]: http://www.pnas.org/content/early/2012/11/29/1218054109.abstract?sid=000a8486-8488-411b-9757-50cce7524a92
 [2]: http://www.amazon.com/Research-Methods-Anthropology-Qualitative-Quantitative/dp/0759108684/ref=sr_1_4?s=books&ie=UTF8&qid=1354899394&sr=1-4
 [3]: http://housesofstones.github.io/2012/10/04/social-scientists-sometimes-have-kind-of-a-weird-view-of-their-own-relevance/
 [4]: http://en.wikipedia.org/wiki/Refrigeration#Cyclic_refrigeration
 [5]: http://www.pnas.org/content/107/32/14431.full
 [6]: http://housesofstones.github.io/2012/05/09/the-qualitativequantitative-divide-is-sort-of-useless-focus-on-replicability-instead/
 [7]: http://www.statisticsblog.com/2012/12/the-surprisingly-weak-case-for-global-warming/
 [8]: http://housesofstones.github.io/2012/02/27/my-problematic-relationship-with-theory/
 [9]: http://groups.lis.illinois.edu/amag/langevgroup/localpapers/origins-of-epistemic-structures-ab-2007.pdf
 [10]: http://housesofstones.github.io/2012/03/12/analytic-modesty-in-the-face-of-poor-performance/
 [11]: http://opinionator.blogs.nytimes.com/2012/05/17/how-reliable-are-the-social-sciences/
 [12]: http://www.nature.com/polopoly_fs/7.6716.1349271308!/suppinfoFile/Kahneman%20Letter.pdf
 [13]: http://pps.sagepub.com/content/current
 [14]: http://housesofstones.github.io/2012/11/13/big-data-of-all-sizes-how-to-turn-a-regular-organization-into-a-data-driven-organization/
