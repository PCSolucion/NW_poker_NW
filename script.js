class Deck {
    constructor() {
    this.deck = [];
    this.reset(); //Add 52 cards to the deck
    this.shuffle(); //Suffle the deck
  } //End of constructor
  
  
  reset() {
    this.deck = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(values[value] + " of " + suits[suit]);
      }
    }
  } //End of reset()
  
  
  shuffle() {
    let numberOfCards = this.deck.length;  
    for (var i=0; i<numberOfCards; i++) {
      let j = Math.floor(Math.random() * numberOfCards);
      let tmp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = tmp;
    }
  } //End of shuffle()
  
  deal(){
    return this.deck.pop();
  } //End of deal()
  
  isEmpty() {
    return (this.deck.length==0);
  } //End of isEmpty()
  
  length() {
    return this.deck.length;
  } //End of length()
  
} //End of Deck Class

class Card {
  constructor(card) {
      this.card = card;
      const cardValues = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};
    
    this.value = cardValues[card];
    this.suit = card.substring(card.indexOf(" of ")+4);
    this.placeHolder = null;
    this.flipped = false;
  
    // Actualizado para considerar que la primera imagen es el dorso (posición 0)
    // Y que las cartas empiezan en la posición 1 del sprite
    const suitOrder = {
      'Hearts': 0,
      'Diamonds': 1,
      'Clubs': 2,
      'Spades': 3
    };
    
    // +1 para saltar el dorso de la carta que está en la posición 0
    this.position = 1 + (suitOrder[this.suit] * 13) + (this.value - 1);
  } //End of Constructor
  
  displayCard(placeHolder,flipped=true) {
    this.placeHolder = document.getElementById(placeHolder);
    this.placeHolder.classList.add("card");
    this.flipped=flipped;
    if (flipped) {
      this.placeHolder.style.backgroundPosition = -150*this.position + "px";
    } else {
      this.placeHolder.style.backgroundPosition = "0px";  
    }
  } // End of displayCard
  
  flip() {
    if (this.flipped) {
      this.addFlipAnimation();
      setTimeout(() => {
      this.placeHolder.style.backgroundPosition = "0px";
        this.flipped = false;
      }, 150); // La mitad de la duración de la animación para cambiar la imagen cuando la carta está de lado
    } else {
      this.addFlipAnimation();
      setTimeout(() => {
      this.placeHolder.style.backgroundPosition = -150*this.position + "px";
        this.flipped = true;
      }, 150); // La mitad de la duración de la animación para cambiar la imagen cuando la carta está de lado
    }
  } //End of flip()
  
  addFlipAnimation() {
    // Añadir la clase de animación
    this.placeHolder.classList.add('flipping');
    
    // Eliminar la clase después de que la animación haya terminado
    setTimeout(() => {
      this.placeHolder.classList.remove('flipping');
    }, 300); // Duración completa de la animación
  }
  
} //End of Card class

class MiniCard {
  constructor(card) {
    this.card = card;
    const cardValues = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};
    
    this.value = cardValues[card];
    this.suit = card.substring(card.indexOf(" of ")+4);
    
    // Define la secuencia correcta para cada baraja
    const suitOrder = {
      'Hearts': 0,      // Corazones
      'Diamonds': 1,    // Diamantes
      'Clubs': 2,       // Tréboles
      'Spades': 3       // Picas
    };
    
    // Calcular la posición en el sprite
    // +1 para saltar el dorso de la carta que está en la posición 0
    const cardIndex = 1 + (suitOrder[this.suit] * 13) + (this.value - 1);
    this.position = cardIndex;
  }
  
  createMiniCard(containerId) {
    const container = document.getElementById(containerId);
    const miniCard = document.createElement('div');
    miniCard.classList.add('mini-card');
    miniCard.setAttribute('title', this.card);
    
    // Cada carta (incluidos espacios) toma 150px en el sprite original
    // Para las miniaturas, usamos un factor de escala para reducir su tamaño
    miniCard.style.backgroundPosition = (-35 * this.position) + "px 0px";
    container.appendChild(miniCard);
    return miniCard;
  }
}

const deck = new Deck();
let card1,card2,card3,card4,card5,playerCard1,playerCard2;
let autoFlipInProgress = false; // Variable para controlar si el volteo automático está en progreso

// Crear elemento de audio para el sonido de premio
let premioSound = new Audio('https://res.cloudinary.com/pcsolucion/video/upload/v1742121077/premio_bsbuz9.m4a');
premioSound.preload = 'auto';

// Variable global para el total de piedras de afilar
let totalPiedras = 0;
// Al cargar la página, intentar recuperar el total guardado y la fecha
const hoy = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
const ultimaFecha = localStorage.getItem('fechaPiedras');
if (ultimaFecha === hoy && localStorage.getItem('totalPiedras')) {
  totalPiedras = parseInt(localStorage.getItem('totalPiedras')) || 0;
} else {
  totalPiedras = 0;
  localStorage.setItem('totalPiedras', 0);
  localStorage.setItem('fechaPiedras', hoy);
}

// Variables para estadísticas de combinaciones (GLOBALES - no se reinician por fecha)
let estadisticasCombinaciones = {
  royalFlush: 0,
  straightFlush: 0,
  fourOfAKind: 0,
  fullHouse: 0,
  flush: 0,
  straight: 0,
  threeOfAKind: 0,
  twoPair: 0,
  pair: 0,
  highCard: 0
};

let totalJugadas = 0; // Contador global de jugadas (no se reinicia por fecha)

// Cargar estadísticas guardadas
function cargarEstadisticas() {
  const statsGuardadas = localStorage.getItem('estadisticasCombinaciones');
  const totalGuardado = localStorage.getItem('totalJugadas');
  
  if (statsGuardadas) {
    estadisticasCombinaciones = JSON.parse(statsGuardadas);
  }
  
  if (totalGuardado) {
    totalJugadas = parseInt(totalGuardado);
  }
  
  actualizarPorcentajes();
}

// Guardar estadísticas
function guardarEstadisticas() {
  localStorage.setItem('estadisticasCombinaciones', JSON.stringify(estadisticasCombinaciones));
  localStorage.setItem('totalJugadas', totalJugadas.toString());
}

// Actualizar porcentajes en la interfaz
function actualizarPorcentajes() {
  const combinaciones = [
    'royalFlush', 'straightFlush', 'fourOfAKind', 'fullHouse', 
    'flush', 'straight', 'threeOfAKind', 'twoPair', 'pair', 'highCard'
  ];
  
  combinaciones.forEach(combinacion => {
    const elemento = document.getElementById(`${combinacion}-percent`);
    if (elemento) {
      const porcentaje = totalJugadas > 0 ? 
        ((estadisticasCombinaciones[combinacion] / totalJugadas) * 100).toFixed(2) : '0.00';
      
      // Actualizar el texto del porcentaje
      const spanElement = elemento.querySelector('span');
      if (spanElement) {
        spanElement.textContent = `${porcentaje}%`;
      }
      
      // Actualizar el ancho de la barra de progreso
      elemento.style.setProperty('--progress-width', `${porcentaje}%`);
      elemento.style.setProperty('--progress-width', `${porcentaje}%`);
    }
  });
  
  // Actualizar contador de jugadas totales
  const totalJugadasElement = document.getElementById('totalJugadasDiv');
  if (totalJugadasElement) {
    totalJugadasElement.textContent = `Total de jugadas (global): ${totalJugadas}`;
  }
}

// Función para reiniciar estadísticas globales
function resetEstadisticas() {
  if (confirm('¿Estás seguro de que quieres reiniciar todas las estadísticas globales? Esta acción no se puede deshacer.')) {
    // Reiniciar contadores
    estadisticasCombinaciones = {
      royalFlush: 0,
      straightFlush: 0,
      fourOfAKind: 0,
      fullHouse: 0,
      flush: 0,
      straight: 0,
      threeOfAKind: 0,
      twoPair: 0,
      pair: 0,
      highCard: 0
    };
    totalJugadas = 0;
    
    // Guardar estadísticas reiniciadas
    guardarEstadisticas();
    
    // Actualizar interfaz
    actualizarPorcentajes();
    
    alert('Estadísticas reiniciadas correctamente.');
  }
}

function deal() {
  if (deck.length()<7) {
    deck.reset();
    deck.shuffle();
  }  
  card1 = new Card(deck.deal());
  card2 = new Card(deck.deal());
  card3 = new Card(deck.deal());
  card4 = new Card(deck.deal());
  card5 = new Card(deck.deal());
  playerCard1 = new Card(deck.deal());
  playerCard2 = new Card(deck.deal());

  
  card1.displayCard("card1",false);  
  card2.displayCard("card2",false);  
  card3.displayCard("card3",false);  
  card4.displayCard("card4",false);  
  card5.displayCard("card5",false);  
  playerCard1.displayCard("playerCard1",true);  
  playerCard2.displayCard("playerCard2",true); 
} //End of deal()

function nextStep(el) {
  // Si el volteo automático está en progreso, lo cancelamos y empezamos una nueva ronda
  if (autoFlipInProgress) {
    autoFlipInProgress = false;
    resetHighlights();
    deal();
    el.innerHTML = "Nueva ronda";
    // Iniciar volteo automático después de un breve retraso
    setTimeout(() => {
      autoFlipCards();
    }, 1000);
  } else {
    // Si no hay volteo automático, el botón inicia una nueva ronda
    resetHighlights();
    deal();
    el.innerHTML = "Nueva ronda";
    // Iniciar volteo automático después de un breve retraso
    setTimeout(() => {
      autoFlipCards();
    }, 1000);
  }
} //End of nextStep()

// Función para voltear automáticamente las cartas con retardo
function autoFlipCards() {
  autoFlipInProgress = true;
  const btn = document.querySelector('#playerCards button');
  
  // Voltear primera carta después de 1 segundo
  setTimeout(() => {
    if (!autoFlipInProgress) return;
    card1.flip();
    
    // Voltear segunda carta después de 2 segundos
    setTimeout(() => {
      if (!autoFlipInProgress) return;
      card2.flip();
      
      // Voltear tercera carta después de 2 segundos
      setTimeout(() => {
        if (!autoFlipInProgress) return;
        card3.flip();
        
        // Voltear cuarta carta después de 2 segundos
        setTimeout(() => {
          if (!autoFlipInProgress) return;
          card4.flip();
          
          // Voltear quinta carta después de 2 segundos
          setTimeout(() => {
            if (!autoFlipInProgress) return;
            card5.flip();
            
            // Evaluar la mano después de mostrar todas las cartas
            setTimeout(() => {
              if (!autoFlipInProgress) return;
              evaluateHand();
              btn.innerHTML = "Nueva ronda";
            }, 1000);
            
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 1000);
}

// Iniciar el juego cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
  cargarEstadisticas(); // Cargar estadísticas guardadas
  deal();
  // Crear las combinaciones de póker de ejemplo
  createPokerCombinations();
  // Iniciar el volteo automático después de un breve retraso
  setTimeout(() => {
    autoFlipCards();
  }, 1000);
  actualizarTotalPiedras(); // Mostrar el total al cargar
});

function createPokerCombinations() {
  // Limpiar las combinaciones existentes antes de recrearlas
  const combinationIds = ["royalFlush", "straightFlush", "fourOfAKind", "fullHouse", "flush", "straight", "threeOfAKind", "twoPair", "pair", "highCard"];
  combinationIds.forEach(id => {
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = '';
    }
  });

  // Royal Flush - A, K, Q, J, 10 del mismo palo (corazones)
  // Las cartas se muestran en orden ascendente (10 a A)
  const royalFlush = ["10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts"];
  displayCombination(royalFlush, "royalFlush");
  
  // Straight Flush - 5 cartas consecutivas del mismo palo
  // Mostramos del 5 al 9 de picas
  const straightFlush = ["5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades"];
  displayCombination(straightFlush, "straightFlush");
  
  // Four of a Kind - 4 cartas del mismo valor + 1 carta alta
  // Mostramos 4 ochos con un Rey como kicker
  const fourOfAKind = ["8 of Clubs", "8 of Diamonds", "8 of Hearts", "8 of Spades", "King of Hearts"];
  displayCombination(fourOfAKind, "fourOfAKind");
  
  // Full House - 3 cartas del mismo valor + 2 cartas del mismo valor
  // Mostramos 3 Jotas y 2 treses
  const fullHouse = ["3 of Hearts", "3 of Spades", "Jack of Clubs", "Jack of Diamonds", "Jack of Hearts"];
  displayCombination(fullHouse, "fullHouse");
  
  // Flush - 5 cartas del mismo palo no consecutivas
  // Mostramos 5 diamantes no consecutivos
  const flush = ["2 of Diamonds", "6 of Diamonds", "8 of Diamonds", "Jack of Diamonds", "Ace of Diamonds"];
  displayCombination(flush, "flush");
  
  // Straight - 5 cartas consecutivas de diferentes palos
  // Mostramos una escalera de 6 a 10
  const straight = ["6 of Hearts", "7 of Spades", "8 of Clubs", "9 of Diamonds", "10 of Hearts"];
  displayCombination(straight, "straight");
  
  // Three of a Kind - 3 cartas del mismo valor
  // Mostramos 3 Reinas
  const threeOfAKind = ["2 of Hearts", "9 of Spades", "Queen of Clubs", "Queen of Diamonds", "Queen of Hearts"];
  displayCombination(threeOfAKind, "threeOfAKind");
  
  // Two Pair - 2 pares de cartas del mismo valor
  // Mostramos par de Reinas y par de Reyes + As
  const twoPair = ["Queen of Hearts", "Queen of Diamonds", "King of Clubs", "King of Diamonds", "Ace of Spades"];
  displayCombination(twoPair, "twoPair");
  
  // Pair - 1 par de cartas del mismo valor
  // Mostramos un par de 10
  const pair = ["2 of Clubs", "5 of Diamonds", "9 of Hearts", "10 of Clubs", "10 of Spades"];
  displayCombination(pair, "pair");
  
  // High Card - cartas no relacionadas
  // Mostramos cartas sueltas con un As como carta alta
  const highCard = ["2 of Hearts", "5 of Spades", "9 of Clubs", "Jack of Diamonds", "Ace of Hearts"];
  displayCombination(highCard, "highCard");
}

function displayCombination(cards, containerId) {
  // Ordenar las cartas para mostrarlas de forma más clara
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Primero, borramos cualquier contenido previo
  container.innerHTML = '';
  
  // Mostrar las cartas ordenadas por su valor nominal para mayor claridad visual
  const sortedCards = [...cards]; // Hacer una copia para no modificar el original
  
  // Crear las mini cartas en el contenedor
  sortedCards.forEach(card => {
    new MiniCard(card).createMiniCard(containerId);
  });
}

// Función para evaluar qué combinación tiene el jugador
function evaluateHand() {
  // Obtener todas las cartas disponibles (mano del jugador + mesa)
  const allCards = [
    {name: card1.card, value: card1.value, suit: card1.suit},
    {name: card2.card, value: card2.value, suit: card2.suit},
    {name: card3.card, value: card3.value, suit: card3.suit},
    {name: card4.card, value: card4.value, suit: card4.suit},
    {name: card5.card, value: card5.value, suit: card5.suit},
    {name: playerCard1.card, value: playerCard1.value, suit: playerCard1.suit},
    {name: playerCard2.card, value: playerCard2.value, suit: playerCard2.suit}
  ];
  
  // Evaluar las combinaciones de mayor a menor valor
  if (hasRoyalFlush(allCards)) {
    highlightCombination("royalFlush");
  } else if (hasStraightFlush(allCards)) {
    highlightCombination("straightFlush");
  } else if (hasFourOfAKind(allCards)) {
    highlightCombination("fourOfAKind");
  } else if (hasFullHouse(allCards)) {
    highlightCombination("fullHouse");
  } else if (hasFlush(allCards)) {
    highlightCombination("flush");
  } else if (hasStraight(allCards)) {
    highlightCombination("straight");
  } else if (hasThreeOfAKind(allCards)) {
    highlightCombination("threeOfAKind");
  } else if (hasTwoPair(allCards)) {
    highlightCombination("twoPair");
  } else if (hasPair(allCards)) {
    highlightCombination("pair");
  } else {
    highlightCombination("highCard");
  }
}

// Función para resaltar una combinación en la tabla
function highlightCombination(combinationId) {
  // Primero quitar cualquier resaltado anterior
  resetHighlights();
  
  // Encontrar la fila de la tabla que contiene esta combinación
  const row = document.getElementById(combinationId).closest('tr');
  if (row) {
    row.classList.add('highlighted');
    
    // Incrementar contador de jugadas y estadísticas
    totalJugadas++;
    estadisticasCombinaciones[combinationId]++;
    
    // Guardar estadísticas
    guardarEstadisticas();
    
    // Actualizar porcentajes en la interfaz
    actualizarPorcentajes();
    
    // Sumar piedras de afilar al total
    totalPiedras += getPiedrasPorCombinacion(combinationId);
    actualizarTotalPiedras();
    
    // Reproducir el sonido de premio
    premioSound.currentTime = 0; // Reiniciar el sonido si ya estaba reproduciéndose
    premioSound.play().catch(e => console.log("Error al reproducir sonido:", e));
  }
}

// Función para quitar todos los resaltados
function resetHighlights() {
  const rows = document.querySelectorAll('.combinations-table tr');
  rows.forEach(row => {
    row.classList.remove('highlighted');
  });
}

// Funciones para evaluar cada tipo de combinación

function hasRoyalFlush(cards) {
  return hasStraightFlush(cards) && 
         cards.some(card => card.value === 1) && // Tiene un As
         cards.some(card => card.value === 13); // Tiene un Rey
}

function hasStraightFlush(cards) {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  for (let suit of suits) {
    const suitCards = cards.filter(card => card.suit === suit);
    if (suitCards.length >= 5 && hasStraightInCards(suitCards)) {
      return true;
    }
  }
  return false;
}

function hasFourOfAKind(cards) {
  // Contar cuántas cartas hay de cada valor
  const valueCounts = countValues(cards);
  // Comprobar si algún valor aparece 4 veces
  return Object.values(valueCounts).some(count => count === 4);
}

function hasFullHouse(cards) {
  // Contar cuántas cartas hay de cada valor
  const valueCounts = countValues(cards);
  const counts = Object.values(valueCounts);
  // Comprobar si hay un trío y un par
  return counts.includes(3) && counts.includes(2);
}

function hasFlush(cards) {
  // Contar cartas por palo
  const suitCounts = {};
  cards.forEach(card => {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
  });
  // Comprobar si hay 5 o más cartas del mismo palo
  return Object.values(suitCounts).some(count => count >= 5);
}

function hasStraight(cards) {
  return hasStraightInCards(cards);
}

function hasThreeOfAKind(cards) {
  // Contar cuántas cartas hay de cada valor
  const valueCounts = countValues(cards);
  // Comprobar si algún valor aparece 3 veces
  return Object.values(valueCounts).some(count => count === 3);
}

function hasTwoPair(cards) {
  // Contar cuántas cartas hay de cada valor
  const valueCounts = countValues(cards);
  // Contar cuántos pares hay
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  return pairs.length >= 2;
}

function hasPair(cards) {
  // Contar cuántas cartas hay de cada valor
  const valueCounts = countValues(cards);
  // Comprobar si algún valor aparece 2 veces
  return Object.values(valueCounts).some(count => count === 2);
}

// Función auxiliar para contar valores de cartas
function countValues(cards) {
  const valueCounts = {};
  cards.forEach(card => {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
  });
  return valueCounts;
}

// Función auxiliar para comprobar si hay una escalera
function hasStraightInCards(cards) {
  if (cards.length < 5) return false;
  
  // Ordenar cartas por valor
  const sortedValues = [...new Set(cards.map(card => card.value))].sort((a, b) => a - b);
  
  // Comprobar si hay 5 valores consecutivos
  for (let i = 0; i <= sortedValues.length - 5; i++) {
    if (sortedValues[i + 4] - sortedValues[i] === 4) {
      return true;
    }
  }
  
  // Comprobar caso especial: A-2-3-4-5 (As puede ser alto o bajo)
  if (sortedValues.includes(1) && // As
      sortedValues.includes(2) && 
      sortedValues.includes(3) && 
      sortedValues.includes(4) && 
      sortedValues.includes(5)) {
    return true;
  }
  
  return false;
}

// Función para obtener el número de piedras según la combinación
function getPiedrasPorCombinacion(combinationId) {
  switch (combinationId) {
    case "royalFlush": return 50;
    case "straightFlush": return 40;
    case "fourOfAKind": return 30;
    case "fullHouse": return 25;
    case "flush": return 20;
    case "straight": return 14;
    case "threeOfAKind": return 10;
    case "twoPair": return 8;
    case "pair": return 4;
    case "highCard": return 2;
    default: return 0;
  }
}

// Función para actualizar el total en la interfaz
function actualizarTotalPiedras() {
  let totalDiv = document.getElementById('totalPiedrasDiv');
  if (!totalDiv) {
    totalDiv = document.createElement('div');
    totalDiv.id = 'totalPiedrasDiv';
    totalDiv.style = `
      margin: 18px auto 18px auto;
      padding: 18px 0 10px 0;
      width: 100%;
      max-width: 340px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, #3fa7ff 0%, #111 100%);
      border-radius: 18px;
      box-shadow: 0 4px 18px 0 rgba(63,167,255,0.10);
      border: 1.5px solid #3fa7ff;
    `;
    document.querySelector('.combinations-table').prepend(totalDiv);
  }

  // Formatear la fecha
  const fecha = new Date(hoy);
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const fechaFormateada = `${dias[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;

  totalDiv.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;gap:16px;width:100%;">
      <img src="https://res.cloudinary.com/pcsolucion/image/upload/v1749534263/honingstonet5_efjw2a.png" alt="Piedra de afilar" style="width:38px;height:38px;filter:drop-shadow(0 0 4px #3fa7ff);">
      <span style="color:#3fa7ff; font-size:2.5rem; font-weight:800; letter-spacing:2px; text-shadow:0 0 8px #3fa7ff;">${totalPiedras}</span>
    </div>
    <div style="color:#fff; font-size:1.05rem; margin-top:6px; letter-spacing:0.5px; text-align:center; opacity:0.85;">Piedras de afilar entregadas hoy</div>
    <div style="color:#fff; font-size:0.95rem; margin-top:8px; padding:4px 12px; border-radius:6px; background:rgba(0,0,0,0.4); text-shadow:0 1px 2px rgba(0,0,0,0.5);">${fechaFormateada}</div>
  `;
  // Guardar el total y la fecha en localStorage
  localStorage.setItem('totalPiedras', totalPiedras);
  localStorage.setItem('fechaPiedras', hoy);
}