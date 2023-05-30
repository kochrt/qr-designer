const Color = (function () {

  var _ = function (rgba) {
    if (rgba === 'transparent') {
      rgba = [0, 0, 0, 0];
    }
    else if (typeof rgba === 'string') {
      var rgbaString = rgba;
      rgba = rgbaString.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);

      if (rgba) {
        rgba.shift();
      }
      else {
        throw new Error('Invalid string: ' + rgbaString);
      }
    }

    if (rgba[3] === undefined) {
      rgba[3] = 1;
    }

    rgba = rgba.map(a => +a);

    this.rgba = rgba;
  };

  _.prototype = {
    get rgb() {
      return this.rgba.slice(0, 3);
    },

    get alpha() {
      return this.rgba[3];
    },

    set alpha(alpha) {
      this.rgba[3] = alpha;
    },

    get luminance() {
      // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
      var rgba = this.rgba.slice();

      for (var i = 0; i < 3; i++) {
        var rgb = rgba[i];

        rgb /= 255;

        rgb = rgb < .03928 ? rgb / 12.92 : Math.pow((rgb + .055) / 1.055, 2.4);

        rgba[i] = rgb;
      }

      return .2126 * rgba[0] + .7152 * rgba[1] + 0.0722 * rgba[2];
    },

    get inverse() {
      return new _([
        255 - this.rgba[0],
        255 - this.rgba[1],
        255 - this.rgba[2],
        this.alpha
      ]);
    },

    toString: function () {
      return 'rgb' + (this.alpha < 1 ? 'a' : '') + '(' + this.rgba.slice(0, this.alpha >= 1 ? 3 : 4).join(', ') + ')';
    },

    clone: function () {
      return new _(this.rgba);
    },

    // Overlay a color over another
    overlayOn: function (color) {
      var overlaid = this.clone();

      var alpha = this.alpha;

      if (alpha >= 1) {
        return overlaid;
      }

      for (var i = 0; i < 3; i++) {
        overlaid.rgba[i] = overlaid.rgba[i] * alpha + color.rgba[i] * color.rgba[3] * (1 - alpha);
      }

      overlaid.rgba[3] = alpha + color.rgba[3] * (1 - alpha);

      return overlaid;
    },

    contrast: function (color) {
      // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
      var alpha = this.alpha;

      if (alpha >= 1) {
        if (color.alpha < 1) {
          color = color.overlayOn(this);
        }

        var l1 = this.luminance + .05,
          l2 = color.luminance + .05,
          ratio = l1 / l2;

        if (l2 > l1) {
          ratio = 1 / ratio;
        }
        // ratio = floor(ratio, 2);

        return {
          ratio: ratio,
          error: 0,
          min: ratio,
          max: ratio
        };
      }

      // If we’re here, it means we have a semi-transparent background
      // The text color may or may not be semi-transparent, but that doesn't matter

      var onBlack = this.overlayOn(_.BLACK),
        onWhite = this.overlayOn(_.WHITE),
        contrastOnBlack = onBlack.contrast(color).ratio,
        contrastOnWhite = onWhite.contrast(color).ratio;

      var max = Math.max(contrastOnBlack, contrastOnWhite);

      // This is here for backwards compatibility and not used to calculate
      // `min`.  Note that there may be other colors with a closer luminance to
      // `color` if they have a different hue than `this`.
      var closest = this.rgb.map(function (c, i) {
        return Math.min(Math.max(0, (color.rgb[i] - c * alpha) / (1 - alpha)), 255);
      });

      closest = new _(closest);

      var min = 1;
      if (onBlack.luminance > color.luminance) {
        min = contrastOnBlack;
      }
      else if (onWhite.luminance < color.luminance) {
        min = contrastOnWhite;
      }

      return {
        ratio: (min + max) / 2,
        error: (max - min) / 2,
        min: min,
        max: max,
        closest: closest,
        farthest: onWhite == max ? _.WHITE : _.BLACK
      };
    }
  };

  _.BLACK = new _([0, 0, 0]);
  _.GRAY = new _([127.5, 127.5, 127.5]);
  _.WHITE = new _([255, 255, 255]);

  return _
})()

export default Color