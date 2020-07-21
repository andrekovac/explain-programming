---
title: 'Blockchain'
description: 'About blockchain'
date: '2018-02-25T15:26:00.000Z'
author: 'André Kovac'
category: 'other'
tags: ['blockchain', 'crypto', 'bitcoin']
draft: true
---

## Simple definitions

>  It's a form of "trustless trust"

taken [from this Eli5](https://www.reddit.com/r/Bitcoin/comments/4yp5q1/could_you_please_eli5_the_blockchain_technology/)

### Crypto Currencies Business Ideas

[How Crypto Tokens Will Enable the Disruption of Businesses like Uber and Airbnb](https://finnscave.com/2018/02/07/how-crypto-tokens-will-enable-the-disruption-of-businesses-like-uber-and-airbnb/)

## DApp (Distributed App)

- [This video by Siraj Raval](https://youtu.be/gSQXq2_j-mw) is a guide on how to build your first decentralized application.
- You can use the [truffle framework]() to compile and migrate the smart contract and include [web3.js]() as a means to handle user interactions with the blockchain via a **smart contract** written in **Solidity**.
- Data is sent to Solidity using the [RPC Message Protocol](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/com.ibm.aix.progcomc/rpc_msg.htm)

### Tools

* Local ethereum client to show what's going on: `Ganache`
* Framework to write DApps: `Truffle`
* Write smart contracts using the language `solidity`. To add third-party integrations to solidity use so called oracles, e.g. via [oraclize](http://www.oraclize.it/#services). See also [in-browser solidity explorer](http://dapps.oraclize.it/browser-solidity/#gist=9817193e5b05206847ed1fcd1d16bd1d&version=soljson-v0.4.20+commit.3155dd80.js).


### Some Resources

* [Nice tutorial (Siraj based his video on part 1 of this tutorial)](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f)
* [Online Platform to learn dApp development on Ethereum](https://www.zastrin.com/simple-ethereum-voting-dapp.html)
* [Github Repo to Siraj's YouTube video](https://github.com/llSourcell/Your_First_Decentralized_Application)
* [Learn Solidity by coding a Game](https://cryptozombies.io/)


## Further articles

- [Blockchain, Bitcoin, Ethereum Eli5](https://tonyy.in/blockchain-eli5/)

## Blockchain examples

- [Welt der Wunder Token ICO](http://www.weltderwunder.de/articles/welt-der-wunder-ico-zusammenfassung)
- [cryptokitties](https://www.cryptokitties.co/)


## Conversation with Valentin Kahn about utility coins etc.

André [12:33 AM]
Hi Valentin, wir hätten paar Fragen dazu inwiefern utility coins und Geld zusammenspielen können. Bis wieviel Uhr bist du denn heute noch da?

Valentin Kahn [1:42 AM]
Hallo André, sorry für den delay. Bin am swisscom stand, kommt gerne vorbei! Bin moch mindestens bis 2 da
Möglichkeiten sind:
1. Utility coin kann auch gelistet/gehandelt werden
2. Es gibt einen reinen utility coin und einen anderen coin, der getradet werden kann. Der utility coin kann nur auf der plattform eingesetzt werden.
Morgen ab 8 ist auch unser hyperledger- und blockchain-experte Ian da
*8 uhr am morgen

André [1:54 AM]
Super! Wir kommen vorbei

Valentin Kahn [2:11 AM]
1. Token that has utility but is also security (= can be traded) -> handled as if it was a security
2. you have both separately a utility token and a different security that are not directly correlated

André [4:07 AM]
Danke nochmal für die Erklärungen vorhin!

Mir ist noch etwas nicht ganz klar. Wir sagten vorhin, dass *Bitcoin* ein Security Token ist. Das heißt es wird als Anlage benutzt, weil Menschen in der Bitcoin Projekt einen (zurzeit sehr hohen) Wert sehen. Aber welchen Wert sehen sie darin? Den Wert von Bitcoin als eine Währung?

Falls ja, bin ich wieder verwirrt, weil du in deinem Vortrag meintest, ein Token ist entweder a) eine *Anlage*, b) ein *Utility-Token* oder c) eine *Währung*.
--> Somit hast du tokens als *Währung* von Tokens als *Anlage* unterschieden..

Vielleicht können wir morgen darüber quatschen. Erstmal Gute Nacht!

Valentin Kahn [4:15 AM]
Hallo André, Angebot und Nachfrage regulieren den Wert. Das Angebot von Bitcoin wird ausschliesslich durch geminete Blocks erhöht (über den Mining Reward). Die Nachfrage ist aber stark gestiegen, weil Bitcoin Mainstream wurde. Allerdings fast ausschliesslich als Investment, nicht als Währung. Deshalb die hohe Volatilität.

Ein Token kann auch mehr als 1 Kategorie darstellen, tatsächlich ist das sogar meistens der Fall. Bitcoin ist eine Anlage (Security), aber auch eine Währung (zumindest begrenzt als Zahlungsmittel).
Ethereum ist alle 3 (Security, Währung und auch Utility Token). (edited)
Utility ist grundsätzlich auch der Grund, warum man bei Ethereum von einer 2. Generation von Blockchains spricht - aufgrund der turing-complete machine. Diese ermöglicht es, Applikationen on top von Ethereum zu bauen. Und die Transaktionsgebühren (und Mining Rewards) werden in Ether transferiert (= Utility Token).
Die 1. Generation Blockchain - Bitcoin - hat zwar eine Scripting Language, aber keine turing complete functionality. Ich kann also nicht basierend auf Bitcoin eine Applikation bauen. Somit ist es gar nicht möglich, auf Basis von Bitcoin einen Utility Token aufzusetzen.

André [11:44 AM]
Super vielen Dank!

André [12:20 PM]
In einem weiteren guten Video wurde bei Businesses, die das Token Modell benutzen davon geredet, dass eine "scarce resource", die im Netzwerk gehandelt wird, genutzt wird, um den Wert der Tokens zu erhöhen.
Bei Bitcoin wurde gesagt, dass diese "scarce resource" die Computing Power ist, die die Miner zur Verfügung stellen. Das hört sich für mich wie eine Utility an. Oder ist es das nicht?

Valentin Kahn [1:45 PM]
Also Mining dient dazu, dass Beglauben von Transaktionen (in Blöcken) zu randomisieren. In Bitcoin dient die Lösung des komplizierten Hash-Puzzles als Ausgangslage für die randomisierte Auswahl (in Wahrheit jedoch hat man mit höherer Rechenpower eine höhere Wahrscheinlichkeit, den Block beglaubigen zu können, was das Randomisieren etwas abschwächt).
Weil dieser Prozess viel Strom kostet, dient der Mining Reward als Incentive für die Miners. Wer das Puzzle am schnellsten löst, bekommt den Mining Reward und darf Beglaubigen.
Nun ist der Mining Reward die einzige Grundlage, wie neue Bitcoins ins System kommen, und somit ein Scarcity-Faktor, jedoch nicht wirklich ein handelbarer.

André [7:50 PM]
ok cool! Danke!