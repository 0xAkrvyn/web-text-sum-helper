(function() {
  const selection = window.getSelection().toString();
  if (!selection) return;

  // Skip dates (e.g., 12/10/2025, 2025-10-16)
  const datePattern = /\b\d{1,4}[-/]\d{1,2}[-/]\d{1,4}\b/g;
  const cleaned = selection.replace(datePattern, ''); // remove date-like text

  // Extract only numeric values
  const numbers = cleaned.match(/\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b/g);
  if (!numbers) return;

  const sum = numbers
    .map(n => parseFloat(n.replace(/,/g, '')))
    .filter(n => !isNaN(n))
    .reduce((a, b) => a + b, 0);

  // Remove old popup if any
  const oldPopup = document.getElementById('sum-popup');
  if (oldPopup) oldPopup.remove();

  // Create popup
  const popup = document.createElement('div');
  popup.id = 'sum-popup';
  popup.textContent = `Σ ${sum.toLocaleString()}`;
  Object.assign(popup.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: '#333',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '8px',
    zIndex: 999999,
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
  });

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 4000);
})();
