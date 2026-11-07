// UXIS Work Card Measurement Script
const card = document.querySelector('.cases_it');
const image = card.querySelector('img');
const title = card.querySelector('h3');
const tags = card.querySelectorAll('.tag');
const metrics = card.querySelector('.grid-2col');
const arrow = card.querySelector('.icon-circle-aro');

const styles = (el) => window.getComputedStyle(el);

console.log('=== WORK CARD MEASUREMENTS ===\n');

// IMAGE
const imgStyles = styles(image);
console.log('IMAGE:');
console.log('- height:', image.offsetHeight + 'px');
console.log('- width:', image.offsetWidth + 'px');
console.log('- border-radius:', imgStyles.borderRadius);
console.log('- aspect-ratio:', (image.offsetWidth / image.offsetHeight).toFixed(3));

// TITLE
const titleStyles = styles(title);
console.log('\nTITLE:');
console.log('- font-size:', titleStyles.fontSize);
console.log('- font-weight:', titleStyles.fontWeight);
console.log('- letter-spacing:', titleStyles.letterSpacing);
console.log('- line-height:', titleStyles.lineHeight);
console.log('- margin-top:', titleStyles.marginTop);

// TAGS
if (tags.length > 0) {
  const tagStyles = styles(tags[0]);
  console.log('\nTAGS:');
  console.log('- font-size:', tagStyles.fontSize);
  console.log('- padding:', tagStyles.padding);
  console.log('- border-width:', tagStyles.borderWidth);
  console.log('- border-radius:', tagStyles.borderRadius);
  console.log('- gap:', styles(tags[0].parentElement).gap);
}

// METRICS
if (metrics) {
  const metricStyles = styles(metrics);
  console.log('\nMETRICS:');
  console.log('- grid-template-columns:', metricStyles.gridTemplateColumns);
  console.log('- gap:', metricStyles.gap);
  console.log('- margin-top:', metricStyles.marginTop);
}

// ARROW BUTTON
if (arrow) {
  const arrowStyles = styles(arrow);
  console.log('\nARROW BUTTON:');
  console.log('- width:', arrow.offsetWidth + 'px');
  console.log('- height:', arrow.offsetHeight + 'px');
  console.log('- border-radius:', arrowStyles.borderRadius);
  console.log('- background:', arrowStyles.backgroundColor);
  console.log('- border:', arrowStyles.border);
}
