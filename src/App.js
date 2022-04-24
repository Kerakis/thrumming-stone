import React, { useState } from 'react';
import { useHypGeo } from './hooks/hypgeo-hook';
import './index.css';

export default function App() {
  const [deckData, setDeckData] = useState(require('./assets/decklist.json'));
  const [currentTurn, setCurrentTurn] = useState(0);

  // Test data
  let harrysTest = () => setDeckData(require('./assets/harry.json'));
  let standardTest = () => setDeckData(require('./assets/standard.json'));
  let tinyTest = () => setDeckData(require('./assets/tiny.json'));
  let ratsTest = () => setDeckData(require('./assets/rats.json'));
  let nehebTest = () => setDeckData(require('./assets/decklist.json'));

  // This is the initial size of the library
  let N =
    deckData.commandersCount === 0
      ? deckData.mainboardCount
      : deckData.commandersCount > 0 && deckData.signatureSpellsCount > 0
      ? deckData.mainboardCount -
        deckData.commandersCount -
        deckData.signatureSpellsCount
      : deckData.mainboardCount - deckData.commandersCount;

  let n = currentTurn + 7; // Use this as type/tag/etc. 7 is added to account for an opening hand of 7 cards.
  let x = 1; // This is left as one to represent the fact that we want to know our chance to draw at least one card of the type/tag

  // Pull type values from the user's deck
  let isCreature = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '2';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  let isArtifact = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '5';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  let isEnchantment = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '6';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  let isInstant = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '4';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  let isSorcery = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '3';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  let isPlaneswalker = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '1';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  let isLand = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.type === '7';
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });

  const creatures = isCreature.reduce(function (result, item) {
    return result + item;
  }, 0);
  const artifacts = isArtifact.reduce(function (result, item) {
    return result + item;
  }, 0);
  const enchantments = isEnchantment.reduce(function (result, item) {
    return result + item;
  }, 0);
  const instants = isInstant.reduce(function (result, item) {
    return result + item;
  }, 0);
  const sorceries = isSorcery.reduce(function (result, item) {
    return result + item;
  }, 0);
  const planeswalkers = isPlaneswalker.reduce(function (result, item) {
    return result + item;
  }, 0);
  const lands = isLand.reduce(function (result, item) {
    return result + item;
  }, 0);

  const creatureOdds = useHypGeo(N, creatures, n, x);
  const artifactOdds = useHypGeo(N, artifacts, n, x);
  const enchantmentOdds = useHypGeo(N, enchantments, n, x);
  const instantOdds = useHypGeo(N, instants, n, x);
  const sorceryOdds = useHypGeo(N, sorceries, n, x);
  const landOdds = useHypGeo(N, lands, n, x);
  const planeswalkerOdds = useHypGeo(N, planeswalkers, n, x);

  // Get the count for each Singleton Rule Breaker in the deck
  const dragonsApproach = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.name === `Dragon's Approach`;
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  const persistentPetitioners = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.name === `Persistent Petitioners`;
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  const ratColony = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.name === `Rat Colony`;
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  const relentlessRats = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.name === `Relentless Rats`;
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  const sevenDwarves = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.name === `Seven Dwarves`;
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });
  const shadowbornApostles = Object.keys(deckData.mainboard)
    .filter(function (card) {
      return deckData.mainboard[card].card.name === `Shadowborn Apostles`;
    })
    .map((key) => {
      return deckData.mainboard[key].quantity;
    });

  // One is subtracted from each Singleton Rule Breaker since you have to cast the card to get the initial ripple; n (the amount of cards that have been drawn so far) is subtracted from N (the library size) to approximate library size through turns.
  const dragonsApproachOdds = useHypGeo(N - n, dragonsApproach - 1, 4, x);
  const persistentPetitionersOdds = useHypGeo(
    N - n,
    persistentPetitioners - 1,
    4,
    x
  );
  const ratColonyOdds = useHypGeo(N - n, ratColony - 1, 4, x);
  const relentlessRatsOdds = useHypGeo(N - n, relentlessRats - 1, 4, x);
  const sevenDwarvesOdds = useHypGeo(N - n, sevenDwarves - 1, 4, x);
  const shadowbornApostleOdds = useHypGeo(N - n, shadowbornApostles - 1, 4, x);

  const nextTurn = () => {
    setCurrentTurn(currentTurn + 1);
  };

  const previousTurn = () => {
    if (currentTurn > 0) {
      setCurrentTurn(currentTurn - 1);
    }
  };

  const thrummingStone = [`Thrumming Stone`];

  // These are all of the cards that ignore restrictions on the number of a specific card that can be played in a deck
  const singletonRuleBreakers = [
    `Dragon's Approach`,
    `Persistent Petitioners`,
    `Rat Colony`,
    `Relentless Rats`,
    `Seven Dwarves`,
    `Shadowborn Apostle`,
  ];

  let hasThrummingStone = thrummingStone.filter((b) => deckData.mainboard[b]);
  let hasSingletonRuleBreakers = singletonRuleBreakers.filter(
    (b) => deckData.mainboard[b]
  );

  // This feels clunky
  const hasDragonsApproach =
    hasSingletonRuleBreakers.includes(`Dragon's Approach`);
  const hasPersistentPetitioners = hasSingletonRuleBreakers.includes(
    `Persistent Petitioners`
  );
  const hasRatColony = hasSingletonRuleBreakers.includes(`Rat Colony`);
  const hasRelentlessRats =
    hasSingletonRuleBreakers.includes(`Relentless Rats`);
  const hasSevenDwarves = hasSingletonRuleBreakers.includes(`Seven Dwarves`);
  const hasShadowbornApostles =
    hasSingletonRuleBreakers.includes(`Shadowborn Apostle`);

  return (
    <div className='flex flex-col md:h-screen mt-8 md:mt-0 align-center justify-center'>
      <div className='flex flex-col max-w-4xl mx-auto container'>
        <div className='mb-8 mx-auto flex flex-col bg-gray-700 container border-solid border border-gray-100 shadow-xl'>
          <h1 className='md:text-3xl text-xl pt-4 text-center'>
            {deckData.name}
          </h1>
          <h3 className='md:text-xl text-m pb-4 text-center'>
            by {deckData.authors[0].userName}
          </h3>
        </div>
        <div className='mb-4 m-auto bg-gray-700 container border-solid border border-gray-100 shadow-xl'>
          <form className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 p-4 md:justify-items-start'>
            <div className='col-span-3'>
              <label>Total number of creature cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {creatures}
            </div>
            <div className='col-span-3'>
              <label>Total number of artifact cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {artifacts}
            </div>
            <div className='col-span-3'>
              <label>Total number of enchantment cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {enchantments}
            </div>
            <div className='col-span-3'>
              <label>Total number of instant cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {instants}
            </div>
            <div className='col-span-3'>
              <label>Total number of sorcery cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {sorceries}
            </div>
            <div className='col-span-3'>
              <label>Total number of planeswalker cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {planeswalkers}
            </div>
            <div className='col-span-3'>
              <label>Total number of land cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {lands}
            </div>
            <div className='col-span-3'>
              <label>Total number of cards in your library:</label>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {N}
            </div>
          </form>
        </div>
        <div className='m-auto flex flex-col bg-gray-700 container border-solid border border-gray-100 shadow-xl'>
          <div className='flex flex-row justify-center mt-3 container'>
            <button className='border w-8 mx-3' onClick={previousTurn}>
              &#8592;
            </button>
            <span>Current Turn: {currentTurn}</span>
            <button className='border w-8 mx-3' onClick={nextTurn}>
              &#8594;
            </button>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-2 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw a creature by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {creatureOdds}%
            </div>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-2 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw an artifact by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {artifactOdds}%
            </div>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-2 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw an enchantment by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {enchantmentOdds}%
            </div>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-2 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw an instant by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {instantOdds}%
            </div>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-2 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw a sorcery by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {sorceryOdds}%
            </div>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-2 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw a planeswalker by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {planeswalkerOdds}%
            </div>
          </div>
          <div className='flex flex-col md:grid md:grid-cols-4 md:gap-y-2 px-4 pb-4 md:justify-items-start'>
            <div className='col-span-3'>
              <p>Chance to draw a land by turn {currentTurn}:</p>
            </div>
            <div className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full md:w-32 overflow-hidden'>
              {landOdds}%
            </div>
          </div>
        </div>
        <div className='m-auto flex flex-row bg-gray-700 container border-solid border border-gray-100 shadow-xl p-4 mt-4 justify-center'>
          <button
            className='mx-8 py-1 px-1.5 text-sm bg-gray-600 border border-solid border-gray-100'
            onClick={harrysTest}>
            Harry's Chulane Deck
          </button>
          <button
            className='mx-8 py-1 px-1.5 text-sm bg-gray-600 border border-solid border-gray-100'
            onClick={tinyTest}>
            Tiny Leaders Test Deck
          </button>
          <button
            className='mx-8 py-1 px-1.5 text-sm bg-gray-600 border border-solid border-gray-100'
            onClick={standardTest}>
            Standard Test Deck
          </button>
          <button
            className='mx-8 py-1 px-1.5 text-sm bg-gray-600 border border-solid border-gray-100'
            onClick={ratsTest}>
            Rat Colony Test Deck
          </button>
          <button
            className='mx-8 py-1 px-1.5 text-sm bg-gray-600 border border-solid border-gray-100'
            onClick={nehebTest}>
            Neheb Commander Deck
          </button>
        </div>
        {hasSingletonRuleBreakers && hasThrummingStone.length > 0 && (
          <div className='m-auto flex flex-col bg-gray-700 container border-solid border border-gray-100 shadow-xl p-4 mt-4'>
            {hasSingletonRuleBreakers && hasThrummingStone.length > 0 && (
              <div>Thrumming Stone detected!</div>
            )}
            {hasDragonsApproach && hasThrummingStone.length > 0 && (
              <div>
                You have a {dragonsApproachOdds}% chance of rippling into
                another Dragon's Approach with Thrumming Stone out.
              </div>
            )}
            {hasPersistentPetitioners && hasThrummingStone.length > 0 && (
              <div>
                You have a {persistentPetitionersOdds}% chance of rippling into
                another Persistent Petitioners with Thrumming Stone out.
              </div>
            )}
            {hasRatColony && hasThrummingStone.length > 0 && (
              <div>
                You have a {ratColonyOdds}% chance of rippling into another Rat
                Colony with Thrumming Stone out.
              </div>
            )}
            {hasRelentlessRats && hasThrummingStone.length > 0 && (
              <div>
                You have a {relentlessRatsOdds}% chance of rippling into another
                Relentless Rats with Thrumming Stone out.
              </div>
            )}
            {hasSevenDwarves && hasThrummingStone.length > 0 && (
              <div>
                You have a {sevenDwarvesOdds}% chance of rippling into another
                Seven Dwarves with Thrumming Stone out.
              </div>
            )}
            {hasShadowbornApostles && hasThrummingStone.length > 0 && (
              <div>
                You have a {shadowbornApostleOdds}% chance of rippling into
                another Shadowborn Apostles with Thrumming Stone out.
              </div>
            )}
          </div>
        )}
      </div>
      <footer className='mx-auto md:fixed md:right-0 md:bottom-0 m-1 mt-4 text-sm'>
        <p>
          Made with <span className='font-sans'>&#10084;</span> by
          <a
            href='https://github.com/Kerakis'
            target='_blank'
            rel='noopener noreferrer'>
            &nbsp;Kerakis&nbsp;
          </a>
        </p>
      </footer>
    </div>
  );
}
