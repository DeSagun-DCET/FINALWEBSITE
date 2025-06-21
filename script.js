let clickedButton = null;
let currentSugarLevel = null;
let ingredientsChart = null;

function openModal(type, button) {
  if (document.getElementById('side-modal').style.display === 'block') return;

  currentSugarLevel = type;

  ['low', 'normal', 'high'].forEach(id => {
    document.getElementById('modal-' + id).style.display = 'none';
  });

  document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));

  clickedButton = button;
  clickedButton.classList.add('active');

  document.getElementById('modal-' + type).style.display = 'block';
  document.body.classList.add('blur');
}

function closeSideModal() {
  document.getElementById('side-modal').style.display = 'none';
  document.body.classList.remove('blur');

  ['cheesecake', 'cake', 'icecream', 'chocolate'].forEach(id => {
    const modal = document.getElementById('dessert-modal-' + id);
    if (modal) modal.style.display = 'none';
  });

  if (clickedButton) {
    clickedButton.classList.remove('active');
    clickedButton.style.opacity = '1';
  }

  document.querySelectorAll('.button').forEach(btn => {
    btn.classList.remove('disabled');
  });
}

function closeModal(type) {
  const modal = document.getElementById('modal-' + type);
  if (modal) modal.style.display = 'none';
  showSideModal();
}

function showSideModal() {
  document.getElementById('side-modal').style.display = 'block';

  if (clickedButton) {
    document.getElementById('selected-level').textContent = "You selected: " + clickedButton.textContent;
  }

  document.querySelectorAll('.button').forEach(btn => {
    if (btn !== clickedButton) btn.classList.add('disabled');
  });
}

function openDessertModal(type) {
  ['cheesecake', 'cake', 'icecream', 'chocolate'].forEach(id => {
    document.getElementById('dessert-modal-' + id).style.display = 'none';
  });

  const modal = document.getElementById('dessert-modal-' + type);
  if (modal) {
    const title = modal.querySelector('h3');
    if (currentSugarLevel === 'low') {
      title.textContent = `Low Sugar ${type.charAt(0).toUpperCase() + type.slice(1)} Options`;
    } else if (currentSugarLevel === 'normal') {
      title.textContent = `Normal Sugar ${type.charAt(0).toUpperCase() + type.slice(1)} Options`;
    } else if (currentSugarLevel === 'high') {
      title.textContent = `High Sugar ${type.charAt(0).toUpperCase() + type.slice(1)} Options`;
    }

    const lowOptions = modal.querySelectorAll('.low-sugar-options');
    const normalOptions = modal.querySelectorAll('.normal-sugar-options');
    const highOptions = modal.querySelectorAll('.high-sugar-options');
    
    lowOptions.forEach(opt => opt.style.display = 'none');
    normalOptions.forEach(opt => opt.style.display = 'none');
    highOptions.forEach(opt => opt.style.display = 'none');
    
    if (currentSugarLevel === 'low') {
      lowOptions.forEach(opt => opt.style.display = 'flex');
    } else if (currentSugarLevel === 'normal') {
      normalOptions.forEach(opt => opt.style.display = 'flex');
    } else if (currentSugarLevel === 'high') {
      highOptions.forEach(opt => opt.style.display = 'flex');
    }

    modal.style.display = 'block';
  }
}

function getIngredientsForDessert(title) {
  const ingredientsMap = {
    'Berry Delight': [
      { name: 'Cream Cheese', percentage: 30 },
      { name: 'Berries', percentage: 25 },
      { name: 'Almond Flour', percentage: 20 },
      { name: 'Sugar Substitute', percentage: 15 },
      { name: 'Eggs', percentage: 10 }
    ],
    'Lemon Zest': [
      { name: 'Cream Cheese', percentage: 35 },
      { name: 'Lemon', percentage: 25 },
      { name: 'Almond Flour', percentage: 20 },
      { name: 'Sugar Substitute', percentage: 15 },
      { name: 'Eggs', percentage: 5 }
    ],
    'Pumpkin Spice': [
      { name: 'Cream Cheese', percentage: 30 },
      { name: 'Pumpkin', percentage: 25 },
      { name: 'Almond Flour', percentage: 20 },
      { name: 'Spices', percentage: 15 },
      { name: 'Eggs', percentage: 10 }
    ],
    
    'Angel Food': [
      { name: 'Egg Whites', percentage: 40 },
      { name: 'Flour', percentage: 30 },
      { name: 'Sugar Substitute', percentage: 20 },
      { name: 'Cream of Tartar', percentage: 10 }
    ],
    'Flourless Chocolate': [
      { name: 'Dark Chocolate', percentage: 45 },
      { name: 'Almond Meal', percentage: 30 },
      { name: 'Eggs', percentage: 15 },
      { name: 'Sugar Substitute', percentage: 10 }
    ],
    'Carrot Cake': [
      { name: 'Carrots', percentage: 25 },
      { name: 'Almond Flour', percentage: 25 },
      { name: 'Walnuts', percentage: 20 },
      { name: 'Sugar Substitute', percentage: 15 },
      { name: 'Spices', percentage: 15 }
    ],
    
    'Vanilla Bean': [
      { name: 'Cream', percentage: 50 },
      { name: 'Milk', percentage: 30 },
      { name: 'Sugar Substitute', percentage: 15 },
      { name: 'Vanilla', percentage: 5 }
    ],
    'Strawberry Sorbet': [
      { name: 'Strawberries', percentage: 60 },
      { name: 'Water', percentage: 25 },
      { name: 'Sugar Substitute', percentage: 15 }
    ],
    'Dark Chocolate': [
      { name: 'Cream', percentage: 45 },
      { name: 'Milk', percentage: 25 },
      { name: 'Cocoa', percentage: 20 },
      { name: 'Sugar Substitute', percentage: 10 }
    ],
    
    '85% Dark': [
      { name: 'Cocoa', percentage: 85 },
      { name: 'Cocoa Butter', percentage: 10 },
      { name: 'Sugar Substitute', percentage: 5 }
    ],
    'Coconut Almond': [
      { name: 'Dark Chocolate', percentage: 60 },
      { name: 'Coconut', percentage: 20 },
      { name: 'Almonds', percentage: 15 },
      { name: 'Sugar Substitute', percentage: 5 }
    ],
    'Peppermint Bark': [
      { name: 'Dark Chocolate', percentage: 70 },
      { name: 'Peppermint Oil', percentage: 20 },
      { name: 'Sugar Substitute', percentage: 10 }
    ],
  
    'New York Classic': [
      { name: 'Cream Cheese', percentage: 40 },
      { name: 'Sugar', percentage: 25 },
      { name: 'Graham Cracker Crust', percentage: 20 },
      { name: 'Eggs', percentage: 10 },
      { name: 'Vanilla', percentage: 5 }
    ],
    'Chocolate Swirl': [
      { name: 'Cream Cheese', percentage: 35 },
      { name: 'Sugar', percentage: 25 },
      { name: 'Chocolate', percentage: 20 },
      { name: 'Graham Cracker Crust', percentage: 15 },
      { name: 'Eggs', percentage: 5 }
    ],
    'Strawberry Shortcake': [
      { name: 'Cream Cheese', percentage: 35 },
      { name: 'Strawberries', percentage: 25 },
      { name: 'Sugar', percentage: 20 },
      { name: 'Graham Cracker Crust', percentage: 15 },
      { name: 'Eggs', percentage: 5 }
    ],
    
    'Red Velvet': [
      { name: 'Flour', percentage: 30 },
      { name: 'Sugar', percentage: 25 },
      { name: 'Butter', percentage: 20 },
      { name: 'Cocoa', percentage: 15 },
      { name: 'Buttermilk', percentage: 10 }
    ],
    'Chocolate Fudge': [
      { name: 'Flour', percentage: 25 },
      { name: 'Sugar', percentage: 25 },
      { name: 'Chocolate', percentage: 25 },
      { name: 'Butter', percentage: 15 },
      { name: 'Eggs', percentage: 10 }
    ],
    'Vanilla Bean': [
      { name: 'Flour', percentage: 30 },
      { name: 'Sugar', percentage: 25 },
      { name: 'Butter', percentage: 25 },
      { name: 'Eggs', percentage: 15 },
      { name: 'Vanilla', percentage: 5 }
    ],
    
    'Cookies & Cream': [
      { name: 'Cream', percentage: 50 },
      { name: 'Milk', percentage: 25 },
      { name: 'Sugar', percentage: 15 },
      { name: 'Cookie Pieces', percentage: 10 }
    ],
    'Mint Chocolate Chip': [
      { name: 'Cream', percentage: 45 },
      { name: 'Milk', percentage: 25 },
      { name: 'Sugar', percentage: 15 },
      { name: 'Chocolate Chips', percentage: 10 },
      { name: 'Peppermint', percentage: 5 }
    ],
    'Rocky Road': [
      { name: 'Cream', percentage: 40 },
      { name: 'Milk', percentage: 25 },
      { name: 'Sugar', percentage: 15 },
      { name: 'Nuts', percentage: 10 },
      { name: 'Marshmallows', percentage: 10 }
    ],
    
    'Milk Chocolate': [
      { name: 'Cocoa Butter', percentage: 40 },
      { name: 'Sugar', percentage: 35 },
      { name: 'Milk Powder', percentage: 20 },
      { name: 'Cocoa', percentage: 5 }
    ],
    'Hazelnut Praline': [
      { name: 'Milk Chocolate', percentage: 50 },
      { name: 'Hazelnuts', percentage: 25 },
      { name: 'Sugar', percentage: 20 },
      { name: 'Cocoa Butter', percentage: 5 }
    ],
    'Caramel Sea Salt': [
      { name: 'Dark Chocolate', percentage: 50 },
      { name: 'Caramel', percentage: 25 },
      { name: 'Sugar', percentage: 15 },
      { name: 'Sea Salt', percentage: 10 }
    ],
  
'Triple Chocolate': [
    { name: 'Cream Cheese', percentage: 30 },
    { name: 'White Chocolate', percentage: 20 },
    { name: 'Milk Chocolate', percentage: 20 },
    { name: 'Dark Chocolate', percentage: 15 },
    { name: 'Sugar', percentage: 15 }
],
'Salted Caramel': [
    { name: 'Cream Cheese', percentage: 35 },
    { name: 'Caramel', percentage: 25 },
    { name: 'Graham Cracker Crust', percentage: 20 },
    { name: 'Sugar', percentage: 15 },
    { name: 'Sea Salt', percentage: 5 }
],
'Cookie Dough': [
    { name: 'Cream Cheese', percentage: 35 },
    { name: 'Cookie Dough', percentage: 25 },
    { name: 'Graham Cracker Crust', percentage: 20 },
    { name: 'Sugar', percentage: 15 },
    { name: 'Eggs', percentage: 5 }
],

'Triple Chocolate Fudge': [
    { name: 'Chocolate Cake', percentage: 40 },
    { name: 'Fudge', percentage: 30 },
    { name: 'Sugar', percentage: 20 },
    { name: 'Butter', percentage: 10 }
],
'Birthday Cake': [
    { name: 'Vanilla Cake', percentage: 50 },
    { name: 'Frosting', percentage: 30 },
    { name: 'Sprinkles', percentage: 10 },
    { name: 'Sugar', percentage: 10 }
],
'German Chocolate': [
    { name: 'Chocolate Cake', percentage: 40 },
    { name: 'Coconut-Pecan Frosting', percentage: 35 },
    { name: 'Sugar', percentage: 20 },
    { name: 'Eggs', percentage: 5 }
],

'Caramel Brownie': [
    { name: 'Vanilla Ice Cream', percentage: 50 },
    { name: 'Caramel', percentage: 20 },
    { name: 'Brownie Pieces', percentage: 20 },
    { name: 'Sugar', percentage: 10 }
],
'Cookie Dough': [
    { name: 'Vanilla Ice Cream', percentage: 60 },
    { name: 'Cookie Dough', percentage: 25 },
    { name: 'Sugar', percentage: 15 }
],
'Peanut Butter Cup': [
    { name: 'Chocolate Ice Cream', percentage: 60 },
    { name: 'Peanut Butter Cups', percentage: 30 },
    { name: 'Sugar', percentage: 10 }
],

'White Chocolate Raspberry': [
    { name: 'White Chocolate', percentage: 70 },
    { name: 'Raspberry Filling', percentage: 20 },
    { name: 'Sugar', percentage: 10 }
],
'Double Caramel': [
    { name: 'Milk Chocolate', percentage: 60 },
    { name: 'Caramel', percentage: 25 },
    { name: 'Toffee', percentage: 10 },
    { name: 'Sugar', percentage: 5 }
],
'Cookies & Cream': [
    { name: 'White Chocolate', percentage: 70 },
    { name: 'Cookie Pieces', percentage: 25 },
    { name: 'Sugar', percentage: 5 }
]

  };

  return ingredientsMap[title] || [
    { name: 'Ingredients', percentage: 100 }
  ];
}

function showDessertDetails(title, description, calories, type = 'cheesecake') {
  document.querySelectorAll('.modal').forEach(modal => {
    if (!modal.id.includes('details-modal')) {
      modal.style.display = 'none';
    }
  });
  
  const modalId = `${type}-details-modal`;
  let modal = document.getElementById(modalId);
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3 id="${type}-details-title">${type.charAt(0).toUpperCase() + type.slice(1)} Details</h3>
        <div id="${type}-details-content"></div>
        <button class="close-button" onclick="closeDetailsModal('${type}')">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  const titleElement = document.getElementById(`${type}-details-title`);
  const contentElement = document.getElementById(`${type}-details-content`);
  
  titleElement.textContent = title;
  
  const ingredients = getIngredientsForDessert(title);
  const showIngredientsBtn = currentSugarLevel === 'low' ? 
    `<button class="action-button" onclick="showIngredientsModal('${title.replace(/'/g, "\\'")}')">
      Show Ingredients
    </button>` : '';
  
  contentElement.innerHTML = `
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Calories:</strong> ${calories}</p>
    <p><strong>Sugar Level:</strong> ${currentSugarLevel === 'low' ? 'Low' : 
                                     currentSugarLevel === 'normal' ? 'Normal' : 'High'} Sugar</p>
    ${showIngredientsBtn}
  `;
  
  modal.style.display = 'block';
  document.body.classList.add('blur');
}

function closeDetailsModal(type) {
  const modal = document.getElementById(`${type}-details-modal`);
  if (modal) {
    modal.style.display = 'none';
    document.body.classList.remove('blur');
  }
}

function showIngredientsModal(dessertTitle) {
  const ingredients = getIngredientsForDessert(dessertTitle);
  const modal = document.getElementById('ingredients-modal');
  const titleElement = document.getElementById('ingredients-title');
  const pieChart = document.getElementById('pie-chart');
  const legend = document.getElementById('chart-legend');

  document.querySelectorAll('.modal').forEach(m => {
    if (m.id !== 'ingredients-modal') {
      m.style.display = 'none';
    }
  });
  
  document.body.classList.add('modal-open');
  
  titleElement.textContent = `${dessertTitle} Ingredients`;

  pieChart.innerHTML = '';
  legend.innerHTML = '';
  
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#8AC24A', '#FF5722',
    '#607D8B', '#9C27B0'
  ];
  
  let cumulativePercent = 0;
  
  ingredients.forEach((ingredient, index) => {
    const percent = ingredient.percentage;
    const color = colors[index % colors.length];
    const rotation = cumulativePercent * 3.6;
    
    const slice = document.createElement('div');
    slice.className = 'pie-slice';
    slice.style.background = `conic-gradient(
      ${color} 0deg ${percent * 3.6}deg,
      transparent ${percent * 3.6}deg 360deg
    )`;
    slice.style.transform = `rotate(${rotation}deg)`;
    
    pieChart.appendChild(slice);
    
    const legendItem = document.createElement('li');
    legendItem.innerHTML = `
      <span class="legend-color" style="background-color: ${color}"></span>
      ${ingredient.name}: ${percent}%
    `;
    legend.appendChild(legendItem);
    
    cumulativePercent += percent;
  });
  
  modal.style.display = 'block';
  document.body.classList.add('blur');
}

function closeIngredientsModal() {
  document.getElementById('ingredients-modal').style.display = 'none';
  document.body.classList.remove('blur');
  
  document.body.classList.remove('modal-open');
}

document.addEventListener('DOMContentLoaded', function() {
 
  document.querySelectorAll('.dessert-card').forEach(card => {
    const title = card.querySelector('h4').textContent;
    const description = card.querySelector('p').textContent;
    const calories = card.querySelectorAll('p')[1].textContent;
    
    let type = 'cheesecake';
    let parent = card.closest('[id^="dessert-modal-"]');
    if (parent) {
      type = parent.id.replace('dessert-modal-', '');
    }
    S
    card.addEventListener('click', () => {
      showDessertDetails(title, description, calories, type);
    });
  });
});

function closeCheesecakeDetailsModal() {
    closeDetailsModal('cheesecake');
}
