export const testProposals = [
	{
		_id: '668bb24d604b391604ddec5a',
		event: 'propose',
		event_index: 1,
		txId: '0xf40826927d8ef3101a4d2f5251a5f0c513acddaf7e855cc2960f9dd83fd95cfd',
		daoContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.ede007-snapshot-proposal-voting-v5',
		submissionContract:
			'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.ede008-funded-proposal-submission-v5',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.edp016-enable-flexible-endtime-voting',
		proposalMeta: {
			dao: '',
			title: ' EDP016 Flexible End Time Proposals',
			author: ' Mike Cohen',
			synopsis:
				'\n' +
				' This proposal enables the start and end of voting on proposals to be set in the funding transaction.\n' +
				';; ',
			description:
				'  This proposal builds on funded proposal submission by allowing the  start block and proposal duration to be set by the funding transaction  The dao sets minimum limits on both the start and duration through the parameters  - minimum-proposal-start-delay  - minimum-proposal-duration'
		},
		contract: {
			source:
				';; Title: EDP016 Flexible End Time Proposals\n' +
				';; Author: Mike Cohen\n' +
				';; Synopsis:\n' +
				';; This proposal enables the start and end of voting on proposals to be set in the funding transaction.\n' +
				';; Description:\n' +
				';; This proposal builds on funded proposal submission by allowing the\n' +
				';; start block and proposal duration to be set by the funding transaction\n' +
				';; The dao sets minimum limits on both the start and duration through the parameters\n' +
				';; - minimum-proposal-start-delay\n' +
				';; - minimum-proposal-duration\n' +
				'\n' +
				'(impl-trait .proposal-trait.proposal-trait)\n' +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(begin\n' +
				'\t\t(try! (contract-call? .ecosystem-dao set-extension .ede008-flexible-funded-submission true))\n' +
				'\t\t(ok true)\n' +
				'\t)\n' +
				')\n' +
				'\n',
			publish_height: 135713
		},
		proposalData: {
			concluded: false,
			passed: false,
			proposer: 'SP1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28GBQA1W0F',
			customMajority: 6600,
			endBlockHeight: -1,
			startBlockHeight: 135731,
			votesAgainst: 0,
			votesFor: 1106053319,
			burnStartHeight: 135731,
			burnEndHeight: 139763
		},
		proposer: 'SP1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28GBQA1W0F'
	},
	{
		_id: '668bb257604b391604dded72',
		event: 'propose',
		event_index: 1,
		txId: '0x8a716711ff25a8939ebe95654e0aef2b92b2b0c0b22ebc0dc06390615bad1d6a',
		daoContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.ede007-snapshot-proposal-voting-v5',
		submissionContract:
			'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.ede008-funded-proposal-submission-v5',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.edp015-sip-activation',
		proposalMeta: {
			dao: ' Ecosystem DAO',
			title: ' Vote to Implement Stacks 2.1 Upgrade',
			author:
				' Aaron Blankstein, Mike Cohen, Greg Coppola, Brice Dobry, \n' +
				' Hero Gamer, Matthew Little, Jenny Mith, Jude Nelson, Pavitthra Pandurangan, \n' +
				';; Rena Shah, Jason Schrader, Hank Stoever, Igor Sylvester, Jesse Wiley\n' +
				';; ',
			synopsis:
				' This proposal outlines a set of updates to three major areas of the Stacks blockchain:\n' +
				' Stacking, Clarity, and block validation.\n' +
				';; ',
			description:
				" Stacks 2.1 is a network-wide upgrade that aims to strengthen the   connection between Stacks and Bitcoin. <br/><br/>The upgrade is designed to bring improvements   to stacking and proof-of-transfer, Clarity functionality, bridges, decentralized   mining pools, and more. <br/><br/>Should this upgrade pass, stakeholders of the Stacks network   can ideally expect more efficient Bitcoin yield via Stacking, more robust bridges   to other networks, improvements to developers' ability to trigger interactions   between Stacks and Bitcoin, and fundamental groundwork laid for Subnets, which will   increase speed and scalability."
		},
		contract: {
			source:
				';; DAO: Ecosystem DAO\n' +
				';; Title: Vote to Implement Stacks 2.1 Upgrade\n' +
				';; Author(s): Aaron Blankstein, Mike Cohen, Greg Coppola, Brice Dobry, \n' +
				';; Hero Gamer, Matthew Little, Jenny Mith, Jude Nelson, Pavitthra Pandurangan, \n' +
				';; Rena Shah, Jason Schrader, Hank Stoever, Igor Sylvester, Jesse Wiley\n' +
				';; Synopsis: This proposal outlines a set of updates to three major areas of the Stacks blockchain:\n' +
				';; Stacking, Clarity, and block validation.\n' +
				';; Description: Stacks 2.1 is a network-wide upgrade that aims to strengthen the \n' +
				';; connection between Stacks and Bitcoin. The upgrade is designed to bring improvements \n' +
				';; to stacking and proof-of-transfer, Clarity functionality, bridges, decentralized \n' +
				';; mining pools, and more. Should this upgrade pass, stakeholders of the Stacks network \n' +
				';; can ideally expect more efficient Bitcoin yield via Stacking, more robust bridges \n' +
				";; to other networks, improvements to developers' ability to trigger interactions \n" +
				';; between Stacks and Bitcoin, and fundamental groundwork laid for Subnets, which will \n' +
				';; increase speed and scalability.\n' +
				'\n' +
				"(impl-trait 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.proposal-trait.proposal-trait)\n" +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(ok true)\n' +
				')\n',
			publish_height: 82957
		},
		proposalData: {
			concluded: true,
			passed: true,
			proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
			customMajority: 6600,
			endBlockHeight: -1,
			startBlockHeight: 83287,
			votesAgainst: 159616327833,
			votesFor: 612756977890,
			burnStartHeight: 83287,
			burnEndHeight: 87319
		},
		proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		links: [
			{
				name: 'Stacks Upgrade of Proof-of-Transfer and Clarity',
				href: 'https://github.com/stacksgov/sips/blob/main/sips/sip-015/sip-015-network-upgrade.md',
				display: 'sip-015-network-upgrade',
				target: '_blank'
			}
		],
		stackerData: {
			stacksAddressYes: 'SP00000000000003SCNSJTCHE66N2PXHX',
			stacksAddressNo: 'SP00000000000000DSQJTCHE66XE1NHQ',
			bitcoinAddressYes: '11111111111111X6zHB1ZC2FmtnqJ',
			bitcoinAddressNo: '1111111111111117CrbcZgemVNFx8',
			sip: true,
			heights: {
				burnStart: 762650,
				burnEnd: 764749,
				stacksStart: 82991,
				stacksEnd: 84797
			}
		}
	},
	{
		_id: '668bb2c8604b391604ddf683',
		event: 'propose',
		event_index: 1,
		txId: '0x62e16bd58eb6a48ad1e2448b273d21fc26c31512a021dbb47164fe863eaf5025',
		daoContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde007-snapshot-proposal-voting',
		submissionContract:
			'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde008-flexible-funded-submission',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto',
		proposalMeta: {
			dao: '',
			title: ' BDP001 SIP 021 Nakamoto Release',
			author:
				' Aaron Blankstein, Charlie Cantoni, Brice Dobry, \n' +
				' Jacinta Ferrent, Diwaker Gupta,Jesus Najera, Jude Nelson, \n' +
				';; Ashton Stephens, Joey Yandle\n' +
				';; ',
			synopsis:
				'\n' +
				' This proposal outlines a significant change to mining and block validation \n' +
				';; that will make the Stacks blockchain faster and more reliable.\n' +
				';; ',
			description:
				'  The document outlines a significant change to the Stacks blockchain,   known as the "Nakamoto" release. This change would uncouple Stacks block   production from miner elections, allowing miners to produce blocks at a   set pace. The PoX Stackers, instead of miner elections, would determine   the transition from one miner to another. A fork in this blockchain would   require a 70% approval from the Stackers, making it as challenging to   reorganize as the Bitcoin blockchain. This update would mark a major version   jump for Stacks, from version 2 to 3. This represents a considerable   architectural shift in how the Stacks blockchain operates, aiming for enhanced   speed and reliability.'
		},
		contract: {
			source:
				';; Title: BDP001 SIP 021 Nakamoto Release\n' +
				';; Author(s): Aaron Blankstein, Charlie Cantoni, Brice Dobry, \n' +
				';; Jacinta Ferrent, Diwaker Gupta,Jesus Najera, Jude Nelson, \n' +
				';; Ashton Stephens, Joey Yandle\n' +
				';; Synopsis:\n' +
				';; This proposal outlines a significant change to mining and block validation \n' +
				';; that will make the Stacks blockchain faster and more reliable.\n' +
				';; Description:\n' +
				';; The document outlines a significant change to the Stacks blockchain, \n' +
				';; known as the "Nakamoto" release. This change would uncouple Stacks block \n' +
				';; production from miner elections, allowing miners to produce blocks at a \n' +
				';; set pace. The PoX Stackers, instead of miner elections, would determine \n' +
				';; the transition from one miner to another. A fork in this blockchain would \n' +
				';; require a 70% approval from the Stackers, making it as challenging to \n' +
				';; reorganize as the Bitcoin blockchain. This update would mark a major version \n' +
				';; jump for Stacks, from version 2 to 3. This represents a considerable \n' +
				';; architectural shift in how the Stacks blockchain operates, aiming for enhanced \n' +
				';; speed and reliability.\n' +
				'\n' +
				'(impl-trait .proposal-trait.proposal-trait)\n' +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(begin\n' +
				'\t\t(ok true)\n' +
				'\t)\n' +
				')\n' +
				'\n',
			publish_height: 138171
		},
		proposalData: {
			concluded: true,
			passed: true,
			proposer: 'SP1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28GBQA1W0F',
			customMajority: 6600,
			endBlockHeight: -1,
			startBlockHeight: 138951,
			votesAgainst: 271344268,
			votesFor: 1553301165679,
			burnStartHeight: 138951,
			burnEndHeight: 142498
		},
		proposer: 'SP1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28GBQA1W0F',
		links: [
			{
				name: 'Nakamoto SIP',
				href: 'https://github.com/stacksgov/sips/blob/6d27e7cf706df5a367d8714e6037226d741630de/sips/sip-021/sip-021-nakamoto.md',
				display: 'sip-021-nakamoto',
				target: '_blank'
			}
		],
		stackerData: {
			stacksAddressYes: 'SP00000000000003SCNSJTCSE62ZF4MSE',
			stacksAddressNo: 'SP00000000000000DSQJTCSE63RMXHDP',
			bitcoinAddressYes: '11111111111111X6zHB1bPW6NJxw6',
			bitcoinAddressNo: '1111111111111117Crbcbt8W5dSU7',
			sip: true,
			heights: {
				burnStart: 829750,
				burnEnd: 833950,
				stacksStart: 833950,
				stacksEnd: 833950
			},
			reportedResults: {
				soloFor: 159087747,
				soloAgainst: 0,
				poolFor: 16524829,
				poolAgainst: 0,
				soloAddresses: 28,
				poolAddresses: 370
			}
		}
	},
	{
		_id: '668d4adc5e99dd9a5af9dfad',
		event: 'propose',
		event_index: 1,
		txId: '0x4610cd14527cb36ac5e1904cadf666883ba6842d27e1a657322de05b1cee3607',
		daoContract: 'bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde007-snapshot-proposal-voting',
		submissionContract:
			'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde008-flexible-funded-submission',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp000-transform-dao',
		proposalMeta: {
			dao: '',
			title: ' BDP000 Manage DAO',
			author: ' Mike Cohen',
			synopsis: '\n Reenables core executions and proposals.\n;; ',
			description:
				'  This proposal makes bitcoin DAO manageable for running stacks votes  Public ability to make proposals is removed for now to prevent  potential spam proposals from disrupting community votes. Core  execution is reintroduced and the sunset period switched off to  facilitate DAO management in the context of community voting.'
		},
		contract: {
			source:
				';; Title: BDP000 Manage DAO\n' +
				';; Author: Mike Cohen\n' +
				';; Synopsis:\n' +
				';; Reenables core executions and proposals.\n' +
				';; Description:\n' +
				';; This proposal makes bitcoin DAO manageable for running stacks votes\n' +
				';; Public ability to make proposals is removed for now to prevent\n' +
				';; potential spam proposals from disrupting community votes. Core\n' +
				';; execution is reintroduced and the sunset period switched off to\n' +
				';; facilitate DAO management in the context of community voting.\n' +
				'\n' +
				'(impl-trait .proposal-trait.proposal-trait)\n' +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(begin\n' +
				'\t\t;; Enable genesis extensions.\n' +
				'\t\t(try! (contract-call? .bitcoin-dao set-extensions\n' +
				'\t\t\t(list\n' +
				'\t\t\t\t{extension: .bde001-proposal-voting, enabled: true}\n' +
				'\t\t\t\t{extension: .bde002-proposal-submission, enabled: false}\n' +
				'\t\t\t\t{extension: .bde003-core-proposals, enabled: true}\n' +
				'\t\t\t\t{extension: .bde004-core-execute, enabled: true}\n' +
				'\t\t\t\t{extension: .bde007-snapshot-proposal-voting, enabled: false}\n' +
				'\t\t\t\t{extension: .bde008-flexible-funded-submission, enabled: false}\n' +
				'\t\t\t)\n' +
				'\t\t))\n' +
				'\t\t\t\t;; Set emergency team members.\n' +
				"\t\t(try! (contract-call? .bde003-core-proposals set-core-team-member 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z true))\n" +
				"\t\t(try! (contract-call? .bde003-core-proposals set-core-team-member 'SP3N4AJFZZYC4BK99H53XP8KDGXFGQ2PRSQP2HGT6 true))\n" +
				'\n' +
				'\t\t;; Set executive team members.\n' +
				"\t\t(try! (contract-call? .bde004-core-execute set-executive-team-member 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z true))\n" +
				"\t\t(try! (contract-call? .bde004-core-execute set-executive-team-member 'SP3N4AJFZZYC4BK99H53XP8KDGXFGQ2PRSQP2HGT6 true))\n" +
				'\t\t(try! (contract-call? .bde004-core-execute set-signals-required u1)) ;; signal from 1 out of 42 team members required.\n' +
				'\n' +
				'\t\t(print "Bitcoin DAO has been reconfigured.")\n' +
				'\t\t(ok true)\n' +
				'\t)\n' +
				')\n',
			publish_height: 156881
		},
		proposalData: {
			concluded: false,
			passed: false,
			proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
			customMajority: 6600,
			endBlockHeight: -1,
			startBlockHeight: 157052,
			votesAgainst: 0,
			votesFor: 0,
			burnStartHeight: 157052,
			burnEndHeight: 157124
		},
		proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z'
	},
	{
		_id: '66904104c03dcb81912c5760',
		event: 'propose',
		event_index: 0,
		txId: '0xea0f41dc6aeac97a420c58435b7d2f1bff651d2d537718e153ce8b0ec7a01f8a',
		daoContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde001-proposal-voting',
		submissionContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde003-core-proposals',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp-dao-config-test',
		proposalMeta: {
			dao: '',
			title: ' DAO Config Test',
			author: ' Mike Cohen',
			synopsis: '\n Provides opportunity for testing for upcoming sip votes.\n;; ',
			description:
				'  This proposal serves as an opportunity to test and provide feedback on the  new stx.eco platform in the run up to two community votes.'
		},
		contract: {
			source:
				';; Title: DAO Config Test\n' +
				';; Author: Mike Cohen\n' +
				';; Synopsis:\n' +
				';; Provides opportunity for testing for upcoming sip votes.\n' +
				';; Description:\n' +
				';; This proposal serves as an opportunity to test and provide feedback on the\n' +
				';; new stx.eco platform in the run up to two community votes.\n' +
				'\n' +
				"(impl-trait 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.proposal-trait.proposal-trait)\n" +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(ok true)\n' +
				')',
			publish_height: 157336
		},
		proposalData: {
			concluded: false,
			passed: false,
			proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
			customMajority: 6600,
			endBlockHeight: -1,
			startBlockHeight: 157341,
			votesAgainst: 0,
			votesFor: 0,
			burnStartHeight: 851804,
			burnEndHeight: 852404
		},
		proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		stackerData: {
			sip: false,
			stacksAddressYes: 'SPB59DGGB5K7PRG36P4WC5FR853BAG4GSMK0F5XS',
			stacksAddressNo: 'SP3Z77Z29VFKBP6KFSH81NNG8H0S6GC4432JPA25V',
			bitcoinAddressYes: '342Pj51KkZRka7ant3YNQ5FthnA5AyXfeg',
			bitcoinAddressNo: '32WinV2fuzeLzqywhHEHVttC6b7ZMX34Aj'
		},
		links: [
			{
				name: 'Nakamoto SIP',
				href: 'https://github.com/stacksgov/sips/blob/6d27e7cf706df5a367d8714e6037226d741630de/sips/sip-021/sip-021-nakamoto.md',
				display: 'sip-021-nakamoto',
				target: '_blank'
			}
		]
	},
	{
		_id: '66911b1a2a235a2314b96d6a',
		event: 'propose',
		event_index: 0,
		txId: '0x598907d6b19b89145ee47031a4af9a9f5a684dfab6a35f47ce1161152accee74',
		daoContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde001-proposal-voting',
		submissionContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde003-core-proposals',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp-multisig-transactions',
		proposalMeta: {
			dao: '',
			title: ' Non-sequential Multisig Transactions',
			author: ' Jeff Bencin, Vlad Bespalov',
			synopsis:
				'\n' + ' Improves handling of multisig transactions on the Stacks Blockchain.\n' + ';; ',
			description:
				'  This SIP proposes a new multisig transaction format which is   intended to be easier to use than the current format described   in SIP-005. It does not remove support for the current format,   rather it is intended to co-exist with the old format and give   users a choice of which format to use. <br/><br/>  The issue with the current format is that it establishes a signer   order when funds are sent to multisig account address, and requires   signers to sign in the same order to spend the funds. In practice, the   current format has proven difficult to understand and implement, as   evidenced by the lack of Stacks multisig implementations today. <br/><br/>  This new format intends to simplify the signing algorithm and remove   the requirement for in-order signing, without compromising on security   or increasing transaction size. It is expected that this will lead to   better wallet support for Stacks multisig transactions.'
		},
		contract: {
			source:
				';; Title: Non-sequential Multisig Transactions\n' +
				';; Author: Jeff Bencin, Vlad Bespalov\n' +
				';; Synopsis:\n' +
				';; Improves handling of multisig transactions on the Stacks Blockchain.\n' +
				';; Description:\n' +
				';; This SIP proposes a new multisig transaction format which is \n' +
				';; intended to be easier to use than the current format described \n' +
				';; in SIP-005. It does not remove support for the current format, \n' +
				';; rather it is intended to co-exist with the old format and give \n' +
				';; users a choice of which format to use.\n' +
				';;\n' +
				';; The issue with the current format is that it establishes a signer \n' +
				';; order when funds are sent to multisig account address, and requires \n' +
				';; signers to sign in the same order to spend the funds. In practice, the \n' +
				';; current format has proven difficult to understand and implement, as \n' +
				';; evidenced by the lack of Stacks multisig implementations today.\n' +
				';;\n' +
				';; This new format intends to simplify the signing algorithm and remove \n' +
				';; the requirement for in-order signing, without compromising on security \n' +
				';; or increasing transaction size. It is expected that this will lead to \n' +
				';; better wallet support for Stacks multisig transactions.\n' +
				'\n' +
				"(impl-trait 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.proposal-trait.proposal-trait)\n" +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(ok true)\n' +
				')',
			publish_height: 157280
		},
		proposalData: {
			concluded: false,
			passed: false,
			proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
			customMajority: 7000,
			endBlockHeight: -1,
			startBlockHeight: 157432,
			votesAgainst: 0,
			votesFor: 0,
			burnStartHeight: 852850,
			burnEndHeight: 857050
		},
		proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		stackerData: {
			sip: false,
			stacksAddressYes: 'SP11R5DKT7DQ1RXEWN224CANGMR71CJM6ZN6SRCSM',
			stacksAddressNo: 'SP16FZ14391RAN55W9J38XEGFNY1DSBMCW3RZJSMR',
			bitcoinAddressYes: '33Q4Yr9x9yR816T7cGQTpYYX2Deiegv8cN',
			bitcoinAddressNo: '33c5jhR538FQXuzgTvKa2b5918TTFiMtpR'
		},
		links: [
			{
				name: 'Nakamoto SIP',
				href: 'https://github.com/stacksgov/sips/blob/174504cc5132473d0f74910ef7f8ba2c17af8068/sips/sip-027/sip-027-non-sequential-multisig-transactions.md',
				display: 'sip-multisig-transactions',
				target: '_blank'
			}
		]
	},
	{
		_id: '66a0ca944586830f66122206',
		event: 'propose',
		event_index: 0,
		txId: '0xf011c1828699bcae95f20033ff9eb1830958c75339b143257b22cf20d9ef18a8',
		daoContract: 'bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde001-proposal-voting',
		submissionContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde003-core-proposals',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.sip-027-multisig-transactions',
		proposalMeta: {
			dao: '',
			title: ' Non-sequential Multisig Transactions',
			author: ' Jeff Bencin, Vlad Bespalov',
			synopsis:
				'\n' + ' Improves handling of multisig transactions on the Stacks Blockchain.\n' + ';; ',
			description:
				'  This SIP proposes a new multisig transaction format which is   intended to be easier to use than the current format described   in SIP-005. It does not remove support for the current format,   rather it is intended to co-exist with the old format and give   users a choice of which format to use. <br/><br/>  The issue with the current format is that it establishes a signer   order when funds are sent to multisig account address, and requires   signers to sign in the same order to spend the funds. In practice, the   current format has proven difficult to understand and implement, as   evidenced by the lack of Stacks multisig implementations today. <br/><br/>  This new format intends to simplify the signing algorithm and remove   the requirement for in-order signing, without compromising on security   or increasing transaction size. It is expected that this will lead to   better wallet support for Stacks multisig transactions.'
		},
		contract: {
			source:
				';; Title: Non-sequential Multisig Transactions\n' +
				';; Author: Jeff Bencin, Vlad Bespalov\n' +
				';; Synopsis:\n' +
				';; Improves handling of multisig transactions on the Stacks Blockchain.\n' +
				';; Description:\n' +
				';; This SIP proposes a new multisig transaction format which is \n' +
				';; intended to be easier to use than the current format described \n' +
				';; in SIP-005. It does not remove support for the current format, \n' +
				';; rather it is intended to co-exist with the old format and give \n' +
				';; users a choice of which format to use.\n' +
				';;\n' +
				';; The issue with the current format is that it establishes a signer \n' +
				';; order when funds are sent to multisig account address, and requires \n' +
				';; signers to sign in the same order to spend the funds. In practice, the \n' +
				';; current format has proven difficult to understand and implement, as \n' +
				';; evidenced by the lack of Stacks multisig implementations today.\n' +
				';;\n' +
				';; This new format intends to simplify the signing algorithm and remove \n' +
				';; the requirement for in-order signing, without compromising on security \n' +
				';; or increasing transaction size. It is expected that this will lead to \n' +
				';; better wallet support for Stacks multisig transactions.\n' +
				'\n' +
				"(impl-trait 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.proposal-trait.proposal-trait)\n" +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(ok true)\n' +
				')',
			publish_height: 158649
		},
		proposalData: {
			concluded: false,
			passed: false,
			proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
			customMajority: 6600,
			endBlockHeight: -1,
			startBlockHeight: 159097,
			votesAgainst: 0,
			votesFor: 0,
			burnStartHeight: 854950,
			burnEndHeight: 857050
		},
		proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		stackerData: {
			sip: true,
			stacksAddressYes: 'SPA17ZSXKXS4D8FC51H1KWQDFS31NM29SKZRTCF8',
			stacksAddressNo: 'SP39DK8BWFM2SA0E3F6NA72104EYG9XB8NXZ91NBE',
			bitcoinAddressYes: '399iMhKN9fjpPJLYHzieZA1PfHsFxijyVY',
			bitcoinAddressNo: '31ssu69FmpxS6bAxjNrX1DfApD8RekK7kp',
			reportedResults: {
				soloFor: 3449000,
				soloAgainst: 0,
				poolFor: 114914556,
				poolAgainst: 0,
				soloAddresses: 1,
				poolAddresses: 75
			}
		},
		links: [
			{
				name: 'Nakamoto SIP',
				href: 'https://github.com/stacksgov/sips/blob/174504cc5132473d0f74910ef7f8ba2c17af8068/sips/sip-027/sip-027-non-sequential-multisig-transactions.md',
				display: 'sip-multisig-transactions',
				target: '_blank'
			}
		]
	},
	{
		_id: '671f85c7e297b52b64088fa6',
		event: 'propose',
		event_index: 0,
		txId: '0x21c877d4f375e20a288e70d3eeca27135f2c940b9d9c4e14744ed3396e721c87',
		daoContract: 'bitcoin-dao',
		votingContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde001-proposal-voting',
		submissionContract: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bde003-core-proposals',
		proposal: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.sip028-signer-criteria-for-sbtc',
		proposalMeta: {
			dao: '',
			title: ' SIP-028: sBTC Signer Criteria',
			author:
				' Adriano Di Luzio, Andre Serrano, Ashton Stephens, Daniel Jordon, \n' +
				' Friedger Muffke, Jesus Najera, Joey Yandle, Jude Nelson, Marten Blankfors,\n' +
				' Tycho Onnasch\n' +
				' ',
			synopsis:
				'\n' +
				' Signer Criteria for sBTC, A Decentralized and Programmable Asset Backed 1:1 with BTC.\n' +
				' ',
			description:
				"  This SIP proposes a new wrapped Bitcoin asset, called sBTC, which would be   implemented on Stacks as a SIP-010 token. sBTC enables seamless and secure   integration of Bitcoin into the Stacks ecosystem, unlocking decentralized   applications and expanding Bitcoin's utility through smart contracts. Stacks   today offers a smart contract runtime for Stacks-hosted assets, and the forthcoming   Stacks 3.0 release provides lower transaction latency than Bitcoin for Stacks transactions.   By providing a robust BTC-wrapping mechanism based on threshold signatures, users would   be able to lock their real BTC on the Bitcoin chain, instantiate an equal amount of sBTC   tokens on Stacks, use these sBTC tokens on Stacks, and eventually redeem them for real BTC   at 1:1 parity, minus the cost of the relevant blockchain transaction fees. <br/><br/>  This is the first of several SIPs that describe such a system. This SIP describes the threshold   signature mechanism and solicits from the ecosystem both a list of signers and the criteria   for vetting them. These sBTC signers would be responsible for collectively holding all locked   BTC and redeeming sBTC for BTC upon request. Given the high-stakes nature of their work,   the authors of this SIP believe that such a wrapped asset can only be made to work in practice   if the Stacks ecosystem members can reach broad consensus on how these signers are chosen. Thus,   the first sBTC SIP put forth for activation concerns the selection of sBTC signers. <br/><br/>  This SIP outlines but does not describe in technical detail the workings of the first sBTC system.   A separate SIP will be written to do so if this SIP successfully activates."
		},
		contract: {
			source:
				';; Title: SIP-028: sBTC Signer Criteria\n' +
				';; Author(s): Adriano Di Luzio, Andre Serrano, Ashton Stephens, Daniel Jordon, \n' +
				';; Friedger Muffke, Jesus Najera, Joey Yandle, Jude Nelson, Marten Blankfors,\n' +
				';; Tycho Onnasch\n' +
				';; Synopsis:\n' +
				';; Signer Criteria for sBTC, A Decentralized and Programmable Asset Backed 1:1 with BTC.\n' +
				';; Description:\n' +
				';; This SIP proposes a new wrapped Bitcoin asset, called sBTC, which would be \n' +
				';; implemented on Stacks as a SIP-010 token. sBTC enables seamless and secure \n' +
				';; integration of Bitcoin into the Stacks ecosystem, unlocking decentralized \n' +
				";; applications and expanding Bitcoin's utility through smart contracts. Stacks \n" +
				';; today offers a smart contract runtime for Stacks-hosted assets, and the forthcoming \n' +
				';; Stacks 3.0 release provides lower transaction latency than Bitcoin for Stacks transactions. \n' +
				';; By providing a robust BTC-wrapping mechanism based on threshold signatures, users would \n' +
				';; be able to lock their real BTC on the Bitcoin chain, instantiate an equal amount of sBTC \n' +
				';; tokens on Stacks, use these sBTC tokens on Stacks, and eventually redeem them for real BTC \n' +
				';; at 1:1 parity, minus the cost of the relevant blockchain transaction fees.\n' +
				';; \n' +
				';; This is the first of several SIPs that describe such a system. This SIP describes the threshold \n' +
				';; signature mechanism and solicits from the ecosystem both a list of signers and the criteria \n' +
				';; for vetting them. These sBTC signers would be responsible for collectively holding all locked \n' +
				';; BTC and redeeming sBTC for BTC upon request. Given the high-stakes nature of their work, \n' +
				';; the authors of this SIP believe that such a wrapped asset can only be made to work in practice \n' +
				';; if the Stacks ecosystem members can reach broad consensus on how these signers are chosen. Thus, \n' +
				';; the first sBTC SIP put forth for activation concerns the selection of sBTC signers.\n' +
				';; \n' +
				';; This SIP outlines but does not describe in technical detail the workings of the first sBTC system. \n' +
				';; A separate SIP will be written to do so if this SIP successfully activates.\n' +
				'\n' +
				'(impl-trait .proposal-trait.proposal-trait)\n' +
				'\n' +
				'(define-public (execute (sender principal))\n' +
				'\t(ok true)\n' +
				')\n',
			publish_height: 171743
		},
		proposalData: {
			concluded: false,
			passed: false,
			proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
			customMajority: 7000,
			endBlockHeight: -1,
			startBlockHeight: 171746,
			votesAgainst: 0,
			votesFor: 0,
			burnStartHeight: 868000,
			burnEndHeight: 869749
		},
		proposer: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		stackerData: {
			sip: true,
			nodao: true,
			heights: {
				burnStart: 868000,
				burnEnd: 869749,
				stacksStart: 175166,
				stacksEnd: 0
			},
			stacksAddressYes: 'SP00000000001WPAWSDEDMQ0B9J72P0KAK2',
			stacksAddressNo: 'SP000000000006WVSDEDMQ0B9J73E2TN78',
			bitcoinAddressYes: '11111111111mdWK2VXcrA1e7dnvidC',
			bitcoinAddressNo: '111111111111ACW5wa4RwyeKYEAzMD'
		},
		links: [
			{
				name: 'Signer Criteria for sBTC',
				href: 'https://github.com/stacksgov/sips/blob/919514d64a8605b50bab992e7350df770dde2bb7/sips/sip-028/sip-028-sbtc_peg.md',
				display: 'sip028-sbtc-signer-criteria',
				target: '_blank'
			}
		]
	}
];
