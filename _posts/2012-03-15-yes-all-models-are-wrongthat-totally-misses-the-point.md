---
title: Yes, all models are wrong…that totally misses the point
author: Schaun Wheeler
layout: post
permalink: /2012/03/15/yes-all-models-are-wrongthat-totally-misses-the-point/
jabber_published:
  - 1331843310
email_notification:
  - 1331843315
tagazine-media:
  - 'a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:8:"20450928";s:7:"blog_id";s:8:"32115977";s:9:"mod_stamp";s:19:"2012-03-17 15:56:53";}'
categories:
  - Analysis
  - Conception
  - Design
  - Implementation
tags:
  - all models are wrong
  - approximation
  - expectations
  - models
  - no longer useful
  - research
  - science
---
The LinkedIn discussion (mentioned [here][1]) that started in response to my [post on theory][2] raised some interesting issues that I want to explore a little more. (I’d give a hyperlink to the LinkedIn discussion itself, but it’s unfortunately in a members-only group. I like that LinkedIn connects people interested in discussing common interests, but I really wish people would comment here, in public. Why use a social media tool to stovepipe communication? Oh, well.) Here’s the comment that got me thinking:<!--more-->

> Yes there are predictabilities but no absolutes. Some folks are more comfortable with their hunches than others. It is that casual and variable extent of personal discipline that may influence policy and practices that bothers me but I also know that occasionally one must hazard a guess and take action because the brick wall ahead is not the desired point of impact. A wise man once said &#8220;All models are wrong, some are useful.&#8221;

Which was then joined by this comment:

> Each theory is at best a coherent approximation of reality. It ties in neatly with [the above] remark &#8220;All models are wrong. Some are useful.&#8221;

The George Box paraphrase – “All models are wrong. Some are useful.” – struck me as odd. I’ve heard it ever since college, but it seemed irrelevant in this context. The discussion was largely about the extent to which we needed to make sure we understood a situation before we tried to change it. I didn’t see where the whole all-models-are-wrong thing fit in. I asked the commenters to explain how it was relevant and didn’t get much of a response, so what follows is a guess at what they meant, and an explanation of why what I think they meant betrays a misunderstanding about models in general.

A lot of what I write in this post was inspired by a [presentation][3] Thad Tarpey gave at the 2009 Joint Statistical Meetings, which I came across from Andrew Gelman [posting][4] it on his blog.

First, some context. When Goerge Box wrote that all models are wrong but some are useful, he was referring to the use of polynomials as approximations in statistical models. Taking the sentence before and after the oft-repeated part of what he said:

> The fact that the polynomial is an approximation does not necessarily detract from its usefulness because all models are approximations. Essentially, all models are wrong but some are useful. However, the approximate nature of the model must always be borne in mind.

I agree with Tarpey that this isn’t really a useful way to characterize models. All models are wrong in the sense that models aren’t reality. In that sense, all street maps are wrong because they aren’t cities. Not being reality is a defining characteristic of all models, and since not being reality is the only sense in which Box was saying that models are wrong, saying that all models are wrong is basically just saying that all models are models, which isn’t useful at all.

All models are right. (All empirical models, at any rate.) They are all approximations of thing we observe. They may approximate reality poorly or may approximate reality very well, but they are all tied to something in the real world that we’re trying to understand. That means the only criterion we have to evaluate a model is not whether it is right but whether it is useful. Tarpey uses the example of pi. π = 3.14 is wrong, because pi’s digits continue (as far as we know) forever. π ≈ 3.14 is right, because now we’re not saying pi is 3.14, but that pi is *roughly* 3.14. There’s no point in proclaiming that pi isn’t really *exactly* 3.14. We already know that it isn’t. The interesting question is whether 3.14 is a good enough approximation to be useful. If you’re trying to do a homework assignment for a middle school math class, it’s probably plenty useful. If you’re trying to manufacture parts for sensitive medical equipment, it probably isn’t.

Same thing with maps. No one looks at a map of New York City and says knowingly, “Well, that’s not *really* New York City *the city*.” Some maps tell you where the streets and subway stations are, some delineate the neighborhoods, some just tell you that there’s an island in the middle of the city called Manhattan. All of those maps are right. If you need to get to the R line right away, only one of them is going to be useful.

I don’t think this is how the commenters were thinking about models when they paraphrased George Box. And I don’t meant to just pick on those commenters – I’ve heard a lot of people throw the all-models-are-wrong phrase, and in nearly all cases I can remember they did so to brush off my or others’ arguments that we needed to understand an issue better. It’s as if they were saying that, because all models are wrong, all models are essentially equally justifiable. That kind of reasoning not only ignores pretty much everything that is important about models (their relative usefulness), but it even oversimplifies Box’s already-clipped quote.

The real question to ask about two or more competing models is whether one model is more useful than another. That begs that question of what “useful” means. Several years ago, I read a [book][5] by sociologist James Rule that I thought addressed that question nicely, so I fished the book out of my shelves again and took a look (this stuff starts around page 13):

> One might think of the search for a needle in a haystack—or, to make the example more theoretical, an effort to develop a system for locating any needle in any haystack. Differences there may be as to which, among contending approaches, appears most elegant or intellectually exciting. In the absence of definitive solutions of a pragmatic sort, aesthetic considerations may have everything to do with which approach attracts more followers.

In other words, if you have different models (approaches) and don’t have any actual evidence about which one is more useful, you’ll probably just pick the one that looks better you.

> But ultimate success—a formula that enables any competent analyst to locate any needle in any haystack—is unmistakable to all concerned and enhances the credibility of the theoretical approach that produces it…. If a reliable formula did in fact exist for locating needles in haystacks, any reasonable person would want to employ it in any such search.

As different approaches are used, we expect to see some approaches give us accurate and actionable information more often or more reliably than others. All the approaches should tell us *something* about needles in haystacks, but some approaches will too often tell us that there are needles in places where there aren’t any, or tell us that there aren’t needles in places where there really are.

When we use a model to help us understand a situation, we agree to match our expectations to the model’s predictions. When the model says something is the case (within a reasonable range of uncertainty), we agree to expect that it will actually be the case. More useful models are those that minimize unrealistic expectations.

That’s why I’ve [argued][2] that popular social science theories aren’t a good basis for making decisions about actual human-behavior problems. Most of those theories have a long history of setting unrealistic expectations – we’re not much better, as a purely practical matter, at predicting most sorts of behaviors than we were decades or even a century ago. That’s also why I [advocate][1] a whole lot more modesty and restraint in advocating drastic action – interventions, changes in business practices, large-scale programs – without first doing a lot more systematic descriptive research to differentiate what we think is going on from what is really going on.

All models are approximations. Great. Let’s get on with our lives. Some approximations of pi work better for certain applications than others. Some maps of cities help you find your way around better than others. Some models of behavior give us fewer surprises and help us avoid unintended consequences better than others. Expectation fulfillment is, ultimately, the only criterion for evaluating models. Questions about founding assumptions, sampling bias, generalizability, validity confounds and all the rest are just special cases of that one overarching concern.

 [1]: http://housesofstones.github.io/2012/03/12/analytic-modesty-in-the-face-of-poor-performance/
 [2]: http://housesofstones.github.io/2012/02/27/my-problematic-relationship-with-theory/
 [3]: http://andrewgelman.com/wp-content/uploads/2012/03/tarpey.pdf
 [4]: http://andrewgelman.com/2012/03/all-models-are-right-most-are-useless/
 [5]: http://www.amazon.com/Theory-Progress-Social-Science-James/dp/0521574943