/**
 * Convert hex color to RGB object
 * @param {string} hex - Hex color code (e.g., '#ff0000')
 * @returns {object} - RGB object with r, g, b, a properties
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255
  } : { r: 0, g: 0, b: 0, a: 255 };
}

/**
 * Get color for a classification value
 * @param {number} value - Classification value (1-5)
 * @param {object} classification - Classification configuration from metadata
 * @returns {object} - RGBA color object
 */
export function getColorForValue(value, classification) {
  // Default colors if classification not provided
  const defaultColors = {
    1: '#d32f2f',
    2: '#f57c00',
    3: '#fbc02d',
    4: '#7cb342',
    5: '#388e3c'
  };

  const classValue = Math.max(1, Math.min(5, Math.round(value)));
  
  let hexColor;
  if (classification && classification.values && classification.values[classValue]) {
    hexColor = classification.values[classValue].color;
  } else {
    hexColor = defaultColors[classValue];
  }

  return hexToRgb(hexColor);
}

/**
 * Create color ramp for continuous values
 * @param {number} value - Value between 0 and 1
 * @param {object} classification - Classification configuration
 * @returns {object} - RGBA color object
 */
export function getColorRamp(value, classification) {
  // Normalize to 1-5 scale
  const scaledValue = 1 + (value * 4);
  return getColorForValue(scaledValue, classification);
}

/**
 * Get color scale array for legend
 * @param {object} classification - Classification configuration
 * @returns {Array} - Array of color stops
 */
export function getColorScale(classification) {
  const scale = [];
  
  for (let i = 1; i <= 5; i++) {
    const color = getColorForValue(i, classification);
    scale.push({
      value: i,
      color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`,
      label: classification?.values?.[i]?.label || `Class ${i}`
    });
  }
  
  return scale;
}

/**
 * Interpolate between two colors
 * @param {object} color1 - First RGB color
 * @param {object} color2 - Second RGB color
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {object} - Interpolated RGBA color
 */
export function interpolateColor(color1, color2, factor) {
  return {
    r: Math.round(color1.r + (color2.r - color1.r) * factor),
    g: Math.round(color1.g + (color2.g - color1.g) * factor),
    b: Math.round(color1.b + (color2.b - color1.b) * factor),
    a: Math.round(color1.a + (color2.a - color1.a) * factor)
  };
}

/**
 * Apply opacity to color
 * @param {object} color - RGBA color object
 * @param {number} opacity - Opacity value (0-1)
 * @returns {object} - RGBA color with applied opacity
 */
export function applyOpacity(color, opacity) {
  return {
    ...color,
    a: Math.round(color.a * opacity)
  };
}