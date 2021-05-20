---
title: 'Blockchain'
description: 'About blockchain'
date: '2018-02-25T15:26:00.000Z'
author: 'André Kovac'
category: 'other'
tags: ['blockchain', 'crypto', 'bitcoin']
ready: true
---

## Simple definitions

- Blockchain

    >  [Blockchain is] a form of "trustless trust"

    taken [from this Eli5](https://www.reddit.com/r/Bitcoin/comments/4yp5q1/could_you_please_eli5_the_blockchain_technology/)

- Utility token (coin)

    > A digital token of cryptocurrency that is issued in order to fund development of the cryptocurrency and that can be later used to purchase a good or service offered by the issuer of the cryptocurrency

    from [Merriam-Webster](https://www.merriam-webster.com/dictionary/utility%20token)

- Consensus

### Crypto Currencies Business Ideas

[How Crypto Tokens Will Enable the Disruption of Businesses like Uber and Airbnb](https://finnscave.com/2018/02/07/how-crypto-tokens-will-enable-the-disruption-of-businesses-like-uber-and-airbnb/)

The idea of this article is that

## DApp (Decentralized application)

A **Decentralized application** (or **dApp** in short) is an application where its business logic runs on blockchain technology - or more generally on a distributed computing system.

User interactions are handled via so-called [smart contracts](https://en.wikipedia.org/wiki/Smart_contract) which run on a blockchain. Smart contracts which define the control-flow of your app are written into the blockchain and visible to everyone. Hereby it is assured that everyone adheres to the same rules. You cannot secretly change how the functions behave.

## Writing a dApp on the Ethereum blockchain

### Program flow

When a user interacts with your app's UI (e.g. presses a button), the frontend code (e.g. a React App) calls the functions defined in the smart contract which write changes into the blockchain.

The UI cannot only call actions on the smart contract, your UI can also be notified of changes happening. To this end, you can setup listeners for certain events which get triggered in the smart contract. If such an event gets triggered you can change the UI accordingly.

### Necessary tools

Quite a few tools are out there which help you to make web application into a decentralized application which runs on a Ethereum smart contract.

- You can use the [Truffle framework](https://www.trufflesuite.com/) to compile and migrate the smart contract.
- [web3.js Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.3.0/#) is a means to handle user interactions with the blockchain via the **smart contract**
- You write the smart contract in the programming language [Solidity](https://solidity.readthedocs.io/en/v0.7.3/).
- **Side note**: Data is sent to Solidity using the [RPC Message Protocol](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_71/com.ibm.aix.progcomc/rpc_msg.htm)

- [This video by Siraj Raval](https://youtu.be/gSQXq2_j-mw) uses exactly the mentioned tools and is a great guide on how to build your first decentralized application.

### Further Tools

* Local Ethereum client to show what's going on: [Ganache](https://www.trufflesuite.com/ganache)
* To add third-party integrations to solidity use so called [Oracles](https://fravoll.github.io/solidity-patterns/oracle.html), e.g. via [oraclize](http://www.oraclize.it/#services). See also [in-browser solidity explorer](http://dapps.oraclize.it/browser-solidity/#gist=9817193e5b05206847ed1fcd1d16bd1d&version=soljson-v0.4.20+commit.3155dd80.js).


### Some Resources

* [Nice tutorial (Siraj based his video on part 1 of this tutorial)](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f)
* [Online Platform to learn dApp development on Ethereum](https://www.zastrin.com/simple-ethereum-voting-dapp.html)
* [Github Repo to Siraj's YouTube video](https://github.com/llSourcell/Your_First_Decentralized_Application)
* [Learn Solidity by coding a Game](https://cryptozombies.io/)


## Further articles

- [Blockchain, Bitcoin, Ethereum Eli5](https://tonyy.in/blockchain-eli5/)

## Blockchain examples

To get you inspired of how decentralized apps can be useful, let's look at the following examples:

- [Basic Attention Token](https://en.bitcoinwiki.org/wiki/Basic_Attention_Token)

    Trade user attention with this utility token. It sounds spooky but on the [brave browser](https://brave.com/) you can

- [Welt der Wunder Token ICO](http://www.weltderwunder.de/articles/welt-der-wunder-ico-zusammenfassung)

    The idea is a utility coin which...

- [Cryptokitties](https://www.cryptokitties.co/)


## Q&A

- Can a utility coin and security co-exist on a blockchain?

    There are two possibilities:

    1. Token that has utility but is also security (= can be traded) -> can also be listed/traded - handled as if it was a security
    2. You have both separately: A utility token and a different security that are not directly correlated. The utility token can only be used on the platform.

- Mir ist noch etwas nicht ganz klar. Wir sagten vorhin, dass *Bitcoin* ein Security Token ist. Das heißt es wird als Anlage benutzt, weil Menschen in der Bitcoin Projekt einen (zurzeit sehr hohen) Wert sehen. Aber welchen Wert sehen sie darin? Den Wert von Bitcoin als eine Währung?

Falls ja, bin ich wieder verwirrt, weil du in deinem Vortrag meintest, ein Token ist entweder a) eine *Anlage*, b) ein *Utility-Token* oder c) eine *Währung*.
--> Somit hast du tokens als *Währung* von Tokens als *Anlage* unterschieden..

    **Reply**:

    - Hallo André, Angebot und Nachfrage regulieren den Wert. Das Angebot von Bitcoin wird ausschliesslich durch geminete Blocks erhöht (über den Mining Reward). Die Nachfrage ist aber stark gestiegen, weil Bitcoin Mainstream wurde. Allerdings fast ausschliesslich als Investment, nicht als Währung. Deshalb die hohe Volatilität.

    - Ein Token kann auch mehr als 1 Kategorie darstellen, tatsächlich ist das sogar meistens der Fall. Bitcoin ist eine Anlage (Security), aber auch eine Währung (zumindest begrenzt als Zahlungsmittel).
    - Ethereum ist alle 3 (Security, Währung und auch Utility Token). Utility ist grundsätzlich auch der Grund, warum man bei Ethereum von einer 2. Generation von Blockchains spricht - aufgrund der turing-complete machine. Diese ermöglicht es, Applikationen on top von Ethereum zu bauen. Und die Transaktionsgebühren (und Mining Rewards) werden in Ether transferiert (= Utility Token).
    - Die 1. Generation Blockchain - Bitcoin - hat zwar eine Scripting Language, aber keine turing complete functionality. Ich kann also nicht basierend auf Bitcoin eine Applikation bauen. Somit ist es gar nicht möglich, auf Basis von Bitcoin einen Utility Token aufzusetzen.


### Conversation with Valentin Kahn about utility coins etc.


André [12:20 PM]
In einem weiteren guten Video wurde bei Businesses, die das Token Modell benutzen davon geredet, dass eine "scarce resource", die im Netzwerk gehandelt wird, genutzt wird, um den Wert der Tokens zu erhöhen.
Bei Bitcoin wurde gesagt, dass diese "scarce resource" die Computing Power ist, die die Miner zur Verfügung stellen. Das hört sich für mich wie eine Utility an. Oder ist es das nicht?

Valentin Kahn [1:45 PM]
Also Mining dient dazu, dass Beglauben von Transaktionen (in Blöcken) zu randomisieren. In Bitcoin dient die Lösung des komplizierten Hash-Puzzles als Ausgangslage für die randomisierte Auswahl (in Wahrheit jedoch hat man mit höherer Rechenpower eine höhere Wahrscheinlichkeit, den Block beglaubigen zu können, was das Randomisieren etwas abschwächt).
Weil dieser Prozess viel Strom kostet, dient der Mining Reward als Incentive für die Miners. Wer das Puzzle am schnellsten löst, bekommt den Mining Reward und darf Beglaubigen.
Nun ist der Mining Reward die einzige Grundlage, wie neue Bitcoins ins System kommen, und somit ein Scarcity-Faktor, jedoch nicht wirklich ein handelbarer.

André [7:50 PM]
ok cool! Danke!