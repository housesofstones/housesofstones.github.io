---
title: Why do Jihadi Clerics become Jihadi?
author: paulmeinshausen
layout: post
permalink: /2012/09/20/why-do-jihadi-clerics-become-jihadi/
jabber_published:
  - 1348157648
email_notification:
  - 1348157649
tagazine-media:
  - 'a:7:{s:7:"primary";s:68:"http://houseofstones.files.wordpress.com/2012/09/jihadwordcloud1.png";s:6:"images";a:1:{s:68:"http://houseofstones.files.wordpress.com/2012/09/jihadwordcloud1.png";a:6:{s:8:"file_url";s:68:"http://houseofstones.files.wordpress.com/2012/09/jihadwordcloud1.png";s:5:"width";i:785;s:6:"height";i:590;s:4:"type";s:5:"image";s:4:"area";i:463150;s:9:"file_path";b:0;}}s:6:"videos";a:0:{}s:11:"image_count";i:1;s:6:"author";s:8:"20544712";s:7:"blog_id";s:8:"32115977";s:9:"mod_stamp";s:19:"2012-09-20 16:14:06";}'
categories:
  - Analysis
  - Assumptions
  - Data Collection
  - Design
  - Interpretation
tags:
  - causal inference
  - ideology
  - Islam
  - Jihadi clerics
  - Jihadism
  - religion
  - sentiment analysis
  - terrorism
  - text analysis
  - text mining
---
I don’t spend a lot of time thinking about Jihadi terrorism these days. I do still [pay attention][1] to the conflict in Afghanistan, and off and on I’ve been able to help with [some projects][2] being undertaken by other researchers. But I don’t have much time to think about terrorism outside of a conflict zone. However, yesterday I saw a flyer in the elevator for [a talk on “Jihadi Clerics”][3] and my interest was piqued enough that I attended.<!--more-->

I’m really glad I did, because it was some of the most solid research on terrorism that I’ve seen. Happily, you don’t have to take my word for it. You can read [the paper][4] and decide for yourself.

Put very simply the question behind the research was “why some Muslim clerics adopt the ideology of militant Islam while others do not”. I actually think a better way to phrase that question is “how” rather than “why”, but that’s probably just semantics. I prefer “how?” questions because they’re about mechanics, and seem to devolve into sloppy causal thinking less easily than “why?” questions. This research does a great job at focusing on mechanics, so in this case it’s not a big deal.

If you’ve opened the paper (or are about to), don’t get bogged down in the first several pages. That’s typically where one starts reading, but those pages are, in my opinion, the less interesting section of the paper. The exciting part starts on page 12. Schaun and I have both written about the [overreliance on theory][5] and [scarcity of data][6] when it comes to a lot of really interesting social phenomena. Terrorism is a classic case. There’s a lot of talk out there, but very little data. For this research, the speaker/author, Richard Nielsen, took a sample of 91 Muslim clerics living or recently deceased, and primarily originating/living in Saudi Arabia and Egypt. These clerics were either Jihadi clerics or Salafi clerics (which basically means religiously conservative). This might at first seem like he’s selecting on the variable he wants to explain. But he’s not because he’s not actually interested in necessarily explaining conservative religiosity, he’s interested in explaining clerics’ justification of violence using conservative religiosity (there is a difference).

This is where it starts to get good. Instead of looking at actual violence or organizational behavior, or other “terrorist” behavior, he looks at writing behavior. So when the research question asks “why/how do Jihadi clerics become Jihadi?” – “become Jihadi” means “write Jihadi things”. I stress this because it’s easy to slip into thinking about things at a much more general and useless level of abstraction, bringing all kinds of confusion from the vagueness of the construct of jihadism. It’s far less interesting to try to explain some general state of being or loose collection of beliefs that you can rarely very specifically define than to explain specific behavior – the kind of concrete things you can observe and point to. If you ask why we should care about “writing” – go remind yourself of why the US government [killed Anwar al-Awlaki][7].

To collect the data he analyzes, he identified websites associated with these 91 clerics, or websites holding their writings, and using [python][8] he scraped the websites to collect a sample of 29,430 texts. With that number of texts, reading them all is basically impossible, so he applied supervised learning methods from the statistical machine learning literature to the documents. He then created two sets of “training documents”, one of confirmed Jihadi documents, and one assumed to be non-Jihadi, to basically “let Jihadis themselves identify the texts that are the most representative of Jihadi ideology”(pg 14). He then applied the characteristics identified as Jihadi (through analyzing those training sets) to probabilistically identify Jihadi documents in his full data set. At this point the paper gets into his use of a certain kind of Bayesian analysis, but I’m not sure I could explain that part of his methods in less space than he used to explain them in the actual paper, so I’ll just let you read them as he explains them himself.

Nielsen’s hypothesis is that clerics:

*“strategically adopt or reject Jihadi ideology because of career incentives generated by the structure of cleric educational networks. Well-connected clerics typically enjoy successful careers within state-run religious institutions. In exchange for continued support from the state, they assist the political elites by opposing — or at least not adopting — the ideology of militant Jihad. In contrast, clerics with low-quality educational networks cannot rely on connections to advance through the state-run institutions, so many pursue careers outside of the system by appealing directly to lay audiences for support. These clerics are more likely to adopt Jihadi ideology because it credibly signals to potential supporters that they have not been theologically coopted by political elites.”*

To evaluate his hypothesis he compares the educational networks of clerics, defined by teacher-student relationships. He then compares “external” vs “internal” career paths. Internal careers are defined as having worked in one (or more) state-supported clerical position. External careers are defined by the absence.

His findings align well with his predictions. Clerics with high network centrality are much more likely to have internal careers and, independently, are much more likely to become jihadist. Clerics with internal careers, independent of network centrality, are much more likely to become jihadist. Here is how he reports the findings regarding his primary predictor, network centrality:

*“I ﬁnd that clerics who are more central in the network are substantially less likely to adopt Jihadi ideology. The model predicts that a cleric with the minimum eigenvector centrality and average values of the other covariates has a 43 percent chance of being Jihadist. If this same cleric instead has the maximum centrality observed in the network, the probability drops to two percent, a statistically signiﬁcant 41 percentage point change. These results are almost identical if I use degree centrality instead of eigenvector centrality (see Models 3 and 4) or if I use cleric Jihad scores as a continuous outcome measure (not shown).”*

These are very important findings. But this is also the major quibble I have with the paper. These findings standing on their own, they don’t really need the additional theory he uses to explain them, and I’m not persuaded that the theory he’s chosen is really the best he could have chosen (and which would have predicted almost exactly the same results). Here’s the part of his theory that I don’t find persuasive:

*“I argue that clerics strategically adopt or reject Jihadi ideology…These clerics are more likely to adopt Jihadi ideology because it credibly signals to potential supporters that they have not been theologically coopted by political elites.”*

First, this emphasis on strategic adoption is going to cause him more trouble then it’s worth, because much of his audience is going to get riled up and accuse him of trying to explain these committed religious clerics as simply engaging in a calculated “rational” strategy to materially benefit themselves. Getting people riled up wouldn’t bother me much if this part of the theory added explanatory value. But I’m not sure it does.

[A substantial body of research in cognitive science][9] has given us reason to believe that human behavior happens through unconscious and implicit processes that don’t require strategic, or even conscious, calculation and planning. [A body of research in experimental psychology][10] has given us reason to believe that we’re extensively influenced by the behavior of those we interact with, and by their responses to us, and that that influence is often unconscious and unrecognized by us (or by them). Moving beyond this general science, [Scott Atran][11] and others have published research explicitly looking at the [cognitive processes behind religious behavior and religious terrorism][12], and [reporting findings][13] such as that participation in religious ritual leads people to attach greater value to particular sacred beliefs. This research undermines the need for a strategic/explicitly-conscious explanation for behavior in general, and for jihadist writing in particular.

So the strategic-choice part of his explanation doesn’t have wider support from the current and recent scientific work on cognition and social influence. But it also doesn’t really add much to the paper’s main findings, and in my opinion, almost detracts from them. I actually think there’s a more stripped-down version of his explanation that would be better.

The two observed causal factors he works with are network centrality and career path (internal/external). Instead of using those to explain the additional factor of “strategic calculation”, he could argue that the social conditions those factors represent either constrain or facilitate the emergence of combative social responses. Being on the inside of a dense social network constrains combative sentiment against that network, being on the outside elicits it. Yes jihadism is a particular kind of combative sentiment, but the reason for this particular variation of jihadism could be explained by larger historical/social factors that make it the most salient institutional justification available (combative clerics looking for something to justify their combativeness can’t turn to radical environmentalism or people’s communism because that just isn’t a familiar set of institutions in their particular social environment). The evidence he presents throughout the paper support this alternative explanation just as well.

Put more directly, I’m suggesting that because they’re not constrained by large networks of internal state-supported clerics and because their professional position is outside those dominant circles, an analysis of the writing/speaking of jihadist clerics would show more references to contention and combativeness than would the writings of central/internal clerics. For example, take the anecdotal evidence from the interviews he conducted. The quote he uses from an interview to describe an external (jihadist) cleric is the following: “Omar “dares to say things that no one else does. Other religious leaders don’t do that. They don’t have the guts” (pg 12). Now here’s the section and quote he uses to illustrate the behavior of an internal cleric:

*“For example, as I sat in the study circle (halaqa) of Sheikh Āḥmad al-Riyān in the al-Azhar mosque of Cairo, a student asked for his opinion on the controversial visit of Sheikh Ali Gomaa’ on April 18th, 2012 to the al-Aqsa mosque. Gomaa’s visit violated a long-standing practice of not visiting the mosque as long as the territory is held by Israel. Other clerics, particularly Jihadists, had been quite vocal in their condemnation because they viewed the visit as legitimating Israel and undermining the Palestinian Jihad. But Sheikh al-Riyān is a career appointee at al-Azhar where he has taught since 1974 and enjoyed several promotions. In response to this sensitive question, Sheikh al-Riyān chuckled, paused, and replied, **“I don’t like to speak about politics.”***

The jihadist cleric had the “guts” to criticize and internal clerics didn’t. Jihadist clerics were quite vocal in their condemnation of another cleric. But the internal sheik (al-Riyan) is constrained by his position and the network that position puts him within, so his response is to defer and change the subject.

The alternative explanation also aligns well with his systematic evidence. Take this (impressive) word cloud visualizing the kinds of words that differentiate Jihadist from non-Jihadist documents:

[<img class="aligncenter size-full wp-image-279" title="Figure 4 from &quot;Jihadi Radicalization of Muslim Clerics&quot; by Rich Nielsen (Dept of Government, Harvard)" src="http://housesofstones.github.io/wp-content/uploads/2012/09/jihadwordcloud1.png" alt="" width="785" height="590" />][4]Say you didn’t know anything at all about Islam, one difference would still be pretty clear: The red words are overwhelmingly words that are about opposition/combat/contention/accusation/ingroup-outgroup conflict. From the top: Apostasize, Jews, Idolatry, War, Fighting, the faithful, the infidels, idolators, falsehood, infidel, enemy, mujahideen, excommunication. The blue words, well, I don’t think I even see one word that directly refers to a them/us opposition or conflict/combativeness. (The two words on the far left, apostasy and jihad, are just illustrating the word size effect and are not part of the actual word cloud).

This alternative explanation also lends itself to additional testing. While I’m not sure about all the practicalities of running this kind of analysis, it’s conceptually plausible that he could do a kind of sentiment analysis to see whether there’s a difference in combativeness between jihadi and non-jihadi documents. If there was, that concrete difference (much more clear and interpretable than the difference between what it means to be jihadi and non jihadi) could be very plausibly explained by the factors of network centrality and career path. Just think of the old trick of hiring your fiercest critics: it’s far less easy to criticize on the inside than on the outside.

This gives us a way of generalizing jihadism as a response to the constraints imposed by an individual’s social network. The variation in social networks then does the rest of the work. We can see it operates very similarly in other networks, like [academic networks in Spain][14]. And we can also see how [social networks influence radicalism and moderation][15] at a more general level.

I think this alternative explanation offers more (insight) at less cost (in assumptions). But at this point I’m not too worried about finding the best explanation. That will emerge with more work. What really excites me about this paper and the larger body of research behind it is the advance it represents in the empirical and systematic study of a topic that’s very important but way too bloated with empty rhetorical explanations. I actually started this post wanting to talk about those broader implications for the study of terrorism. But this post is long enough already. So I’ll just wait and put my thoughts in another post.

In the meantime, [check out the paper][4].

&nbsp;

&nbsp;

 [1]: http://houseofstones.wordpress.com/2012/09/12/feeling-ineffective-needing-the-haqqani-network-2/
 [2]: http://www.santafe.edu/research/videos/play/?id=1afdd4f2-18a8-4b4f-970d-2aa8ae1f1760
 [3]: http://events.iq.harvard.edu/events/node/2893
 [4]: http://people.fas.harvard.edu/~rnielsen/jihad.pdf
 [5]: http://houseofstones.wordpress.com/2012/02/27/my-problematic-relationship-with-theory/
 [6]: http://houseofstones.wordpress.com/2012/03/01/give-data-collection-the-respect-it-deserves/
 [7]: http://www.nytimes.com/2011/10/01/world/middleeast/anwar-al-awlaki-is-killed-in-yemen.html?pagewanted=all&_moc.semityn.www
 [8]: http://en.wikipedia.org/wiki/Python_(programming_language)
 [9]: http://www.amazon.com/New-Unconscious-Social-Cognition-Neuroscience/dp/0195307690
 [10]: http://www.amazon.com/Influence-Science-Practice-5th-Edition/dp/0205609996
 [11]: http://sitemaker.umich.edu/satran/relevant_articles_on_political_conflict___violence
 [12]: /Users/meinshausen/Downloads/%22Religious%20and%20Sacred%20Imperatives%20in%20Human%20Conflict,%22%20S.%20Atran%20&%20J.%20Ginges,%20SCIENCE,%20Vol.%20336%20no.%206083%20pp.%20855-857,%2018%20May%202012
 [13]: /Users/meinshausen/Downloads/%22Religion,%20group%20threat%20and%20sacred%20values,%22%20H.%20Sheikh,%20J.%20Ginges,%20A.%20Coman,%20S.%20Atran,%20Judgment%20and%20Decision%20Making,%20Vol.%207,%20No.%202,%20March%202012,%20pp.%20110%25E2%2580%2593118
 [14]: http://www.voxeu.org/article/it-s-not-what-you-know-who-role-connections-academia#.UFWJSJjB5Lk.twitter
 [15]: http://arxiv.org/pdf/1209.3546v1.pdf