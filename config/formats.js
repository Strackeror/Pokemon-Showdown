'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [
	{
		section: "Salty Formats"
	},
	{
		name: "[Gen 7] UTA",
		searchShow: false,
		challengeShow: false,
		team: 'random',
		rated: false,
		desc: [
			"&bullet; <a href=\"https://strategydatabase.jimdo.com/uta/\">Règles du Use Them All</a>",
			"&bullet; <a href=\"https://strategydatabase.jimdo.com/uta/ressources/\">Liens utiles</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal'],
	},
	{
		name: "[Gen 7] Use Them All",
		desc: [
			"&bullet; <a href=\"https://strategydatabase.jimdo.com/uta/\">Règles du Use Them All</a>",
			"&bullet; <a href=\"https://strategydatabase.jimdo.com/uta/ressources/\">Liens utiles</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Power Construct'],

		onValidateTeam: function (team) {
			let ranks = [false, false, false, false, false, false];
			let tiers = ["S", "A", "B", "C", "D", "E"];
			for (const set of team) {
				let output = ""
				let template = this.getTemplate(set.species);
				let item = this.getItem(set.item);
				if (item.megaStone && template.species === item.megaEvolves)
					template = this.getTemplate(item.megaStone);
				let setrank = template.utarank
				if (setrank == "BAN")
					return `${(set.name || set.species)} is banned.`

				let first = 0;
				for (let tier of tiers) {
					if (tier == setrank) {
						break;
					}
					first += 1;
				}

				let slot = first;
				while (slot >= 0) {
					if (ranks[slot] == false) {
						ranks[slot] = set;
						break;
					}
					slot--
				}

				if (slot < 0) {
					let ranknames = ["S", "A", "B", "C", "D", "E"];
					let tranks = []
					tranks.push("No slot for " + (set.name || set.species) + `(${setrank})`);
					for (let i = 0; i < 6; i++) {
						tranks.push(ranknames[i] + ":" + (ranks[i] ? (ranks[i].name || ranks[i].species) : "None"));
					}
					tranks.push(output);
					return tranks;

				}
			}
		},

		onDisableMove: function (pokemon) {
			if (pokemon.boosts["spe"] > 0)
			{
				pokemon.disableMove('batonpass');
			}
		},

		onValidateSet: function (set, format, setHas) {
			let item = set.item
			let template = this.getTemplate(set.species)
			let mtemplate = null
			if (item.megaStone && template.species === item.megaEvolves) {
				mtemplate = this.getTemplate(item.megaStone);
			}
			if (set.ability == "Shadow Tag" || mtemplate && mtemplate.abilities[0] == "Shadow Tag") {
				for (let move of set.moves) {
					if (this.getMove(move).flags.heal) {
						return [(set.name || set.species) + " can heal while having Shadow Tag"];
					}
				}
			}
		}
	},

	// US/UM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "US/UM Singles",
	},
	{
		name: "[Gen 7] Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Unrated Random Battle",

		mod: 'gen7',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3621042/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3621329/\">OU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3606650/\">OU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 7] Ubers",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3623296/\">Ubers Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3599816/\">Ubers Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: ['Baton Pass'],
	},
	{
		name: "[Gen 7] UU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3625273/\">UU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3620980/\">UU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3621217/\">UU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Kommonium Z', 'Mewnium Z'],
	},
	{
		name: "[Gen 7] RU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3625382/\">RU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3622740/\">RU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3622057/\">RU Sample Teams</a>",
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] UU'],
		banlist: ['UU', 'BL2', 'Aurora Veil'],
	},
	{
		name: "[Gen 7] RU (suspect test)",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3625382/\">RU Suspect Test</a>"],

		mod: 'gen7',
		challengeShow: false,
		ruleset: ['[Gen 7] RU'],
	},
	{
		name: "[Gen 7] NU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3624392/\">NU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3622107/\">NU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3606112/\">NU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] RU'],
		banlist: ['RU', 'BL3', 'Drought'],
	},
	{
		name: "[Gen 7] PU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3614120/\">PU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3614892/\">PU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3614470/\">PU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] NU'],
		banlist: ['NU', 'BL4'],
	},
	{
		name: "[Gen 7] LC",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/dex/sm/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3621440/\">LC Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3588679/\">LC Sample Teams</a>",
		],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: [
			'Aipom', 'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma',
			'Eevium Z', 'Dragon Rage', 'Sonic Boom',
		],
	},
	{
		name: "[Gen 7] Monotype",
		desc: [
			"All the Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3621036/\">Monotype Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3622349\">Monotype Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3599682/\">Monotype Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kartana', 'Kyogre', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna',
			'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] Anything Goes",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587441/\">Anything Goes</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3591711/\">AG Resources</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// US/UM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "US/UM Doubles",
	},
	{
		name: "[Gen 7] Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles Custom Game",

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		teamLength: {
			validate: [2, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3593766/\">BH Resources</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Arena Trap', 'Huge Power', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Chatter', 'Comatose + Sleep Talk'],
	},
	{
		name: "[Gen 7] 1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587523/\">1v1</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3592842/\">1v1 Resources</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh',
			'Kangaskhan-Mega', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Focus Sash', 'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Perish Song', 'Sand Attack', 'Smokescreen',
			'Chansey + Charm + Seismic Toss', 'Chansey + Charm + Psywave',
		],
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 2,
	},
	{
		name: "[Gen 6] Battle Factory",

		mod: 'gen6',
		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] BSS Factory",
		desc: [
			"Randomised 3v3 Singles featuring Pok&eacute;mon and movesets popular in Battle Spot Singles.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3604845/\">Information and Suggestions Thread</a>",
		],

		mod: 'gen7',
		team: 'randomBSSFactory',
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
	},
	{
		name: "[Gen 7] Challenge Cup 1v1",

		mod: 'gen7',
		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "[Gen 7] Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Random Battle",

		mod: 'gen6',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Random Battle",

		mod: 'gen5',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Random Battle",

		mod: 'gen4',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Random Battle",

		mod: 'gen3',
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",

		mod: 'gen2',
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},

	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 3,
	},
	{
		name: "[Gen 6] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/dex/xy/tags/ou/\">ORAS OU Banlist</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3596900/\">ORAS OU Viability Rankings</a>",
		],

		mod: 'gen6',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3599678/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3506147/\">DPP OU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 3] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3556533/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3572352/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
];
