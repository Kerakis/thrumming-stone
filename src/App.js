import React, { useEffect, useRef, useState } from 'react';
import { useHypGeo } from './hooks/hypgeo-hook';
import './index.css';

export default function App() {
  const [deckData, setDeckData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [deckName, setDeckName] = useState([]);
  const [deckAuthor, setDeckAuthor] = useState([]);
  const [N, setN] = useState([]);
  const [isCreature, setIsCreature] = useState([]);
  const [isArtifact, setIsArtifact] = useState([]);
  const [isEnchantment, setIsEnchantment] = useState([]);
  const [isInstant, setIsInstant] = useState([]);
  const [isSorcery, setIsSorcery] = useState([]);
  const [isPlaneswalker, setIsPlaneswalker] = useState([]);
  const [isLand, setIsLand] = useState([]);
  const [dragonsApproach, setDragonsApproach] = useState([]);
  const [persistentPetitioners, setPersistentPetitioners] = useState([]);
  const [ratColony, setRatColony] = useState([]);
  const [relentlessRats, setRelentlessRats] = useState([]);
  const [sevenDwarves, setSevenDwarves] = useState([]);
  const [shadowbornApostles, setShadowbornApostles] = useState([]);
  const [hasThrummingStone, setHasThrummingStone] = useState([]);
  const [hasSingletonRuleBreakers, setHasSingletonRuleBreakers] = useState([]);

  // Fetch Deck Data
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setDisable(true);

    // Isolate the public ID from the URL
    const publicID = userInput.current.value.split('/').pop();

    try {
      const response = await fetch(
        `https://api2.moxfield.com/v2/decks/all/${publicID}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      } else if (response.ok) {
        setError(null);
      }

      const result = await response.json();

      setDeckData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setDisable(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (deckData !== null) {
      setDeckName(deckData.name);
      setDeckAuthor(deckData.authors[0].userName);

      // This is the initial size of the library
      setN(
        deckData.commandersCount === 0
          ? deckData.mainboardCount
          : deckData.commandersCount > 0 && deckData.signatureSpellsCount > 0
          ? deckData.mainboardCount -
            deckData.commandersCount -
            deckData.signatureSpellsCount
          : deckData.mainboardCount - deckData.commandersCount
      );

      // Pull type values from the user's deck
      setIsCreature(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '2';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setIsArtifact(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '5';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setIsEnchantment(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '6';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setIsInstant(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '4';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setIsSorcery(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '3';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setIsPlaneswalker(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '1';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setIsLand(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.type === '7';
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );

      // Get the count for each Singleton Rule Breaker in the deck
      setDragonsApproach(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.name === `Dragon's Approach`;
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setPersistentPetitioners(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return (
              deckData.mainboard[card].card.name === `Persistent Petitioners`
            );
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setRatColony(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.name === `Rat Colony`;
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setRelentlessRats(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.name === `Relentless Rats`;
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setSevenDwarves(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.name === `Seven Dwarves`;
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );
      setShadowbornApostles(
        Object.keys(deckData.mainboard)
          .filter(function (card) {
            return deckData.mainboard[card].card.name === `Shadowborn Apostles`;
          })
          .map((key) => {
            return deckData.mainboard[key].quantity;
          })
      );

      setHasThrummingStone(thrummingStone.filter((b) => deckData.mainboard[b]));
      setHasSingletonRuleBreakers(
        singletonRuleBreakers.filter((b) => deckData.mainboard[b])
      );
    }
  }, [deckData]);

  const userInput = useRef(null);

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

  let n = currentTurn + 7; // Use this as type/tag/etc. 7 is added to account for an opening hand of 7 cards.
  let x = 1; // This is left as one to represent the fact that we want to know our chance to draw at least one card of the type/tag

  const creatureOdds = useHypGeo(N, creatures, n, x);
  const artifactOdds = useHypGeo(N, artifacts, n, x);
  const enchantmentOdds = useHypGeo(N, enchantments, n, x);
  const instantOdds = useHypGeo(N, instants, n, x);
  const sorceryOdds = useHypGeo(N, sorceries, n, x);
  const landOdds = useHypGeo(N, lands, n, x);
  const planeswalkerOdds = useHypGeo(N, planeswalkers, n, x);

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
        <div className='m-auto flex flex-col bg-gray-700 container border-solid border border-gray-100 shadow-xl p-4'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='deckSearch'>Deck URL:</label>
            <input
              className='justify-self-end self-center bg-gray-800 border border-solid rounded border-gray-100 text-center md:text-left px-2 mx-2 my-1 md:my-0 w-full overflow-hidden'
              ref={userInput}
              type='search'
              id='deckSearch'
              name='deckSearch'
              autoFocus
              placeholder='Paste Your Moxfield Deck URL Here'
              required
            />
            <button
              type='submit'
              className='mx-8 mt-4 py-1 px-1.5 text-sm bg-gray-600 border border-solid border-gray-100'
              disabled={disable}>
              Fetch Deck Data
            </button>
          </form>
          <div>
            {isLoading && (
              <h1 className='text-center mt-4'>Fetching Deck...</h1>
            )}
            {error && (
              <h1 className='text-center mt-4'>
                Hmm. Something went wrong. Status: {error}
                <br />
                Be sure you paste the entire Moxfield deck URL. The deck must
                not be set to private.
              </h1>
            )}
          </div>
        </div>
      </div>
      {deckData !== null && (
        <div className='flex flex-col max-w-4xl mx-auto container'>
          <div className='mb-8 mt-8 mx-auto flex flex-col bg-gray-700 container border-solid border border-gray-100 shadow-xl'>
            <h1 className='md:text-3xl text-xl pt-4 text-center'>{deckName}</h1>
            <h3 className='md:text-xl text-m pb-4 text-center'>
              by {deckAuthor}
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
                <label>
                  Total number of enchantment cards in your library:
                </label>
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
                <label>
                  Total number of planeswalker cards in your library:
                </label>
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
                  You have a {persistentPetitionersOdds}% chance of rippling
                  into another Persistent Petitioners with Thrumming Stone out.
                </div>
              )}
              {hasRatColony && hasThrummingStone.length > 0 && (
                <div>
                  You have a {ratColonyOdds}% chance of rippling into another
                  Rat Colony with Thrumming Stone out.
                </div>
              )}
              {hasRelentlessRats && hasThrummingStone.length > 0 && (
                <div>
                  You have a {relentlessRatsOdds}% chance of rippling into
                  another Relentless Rats with Thrumming Stone out.
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
      )}
      <footer className='mx-auto md:fixed md:right-0 md:bottom-0 m-1 mt-4 text-sm bottom-0'>
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
