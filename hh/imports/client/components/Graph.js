import React, {Component, PropTypes} from 'react';


const DEFAULT_STROKE_WIDTH = 0.15;
const DEFAULT_STROKE_COLOR = '#e1e1e1';
/**
 * SVGPath is an svg <path> element with utitlities
 *
 * @param {object[]} points - Array of Point objects - {x, y} - to plot this path
 * @param {string} color - stroke color of path
 * @param {number} [strokeWidth = DEFAULT_STROKE_WIDTH] - Width of the path
 * @param {boolean} [trace = false] - Will set the strokeDashOffset and strokeDashArray to the Path.getTotalLength
 *                                    so the path can appear to "trace" over itself
 * @param {number} [progress] - (min: 0, max: 1) Determines how far the "trace" effect has progressed. This should
 *                              increase in small intervals if trying to animate.
 * @returns {SVGPath} - svg <path> react component.
 */
export default class SVGPath extends Component {

  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.object).isRequired,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    trace: PropTypes.bool,
    progress: PropTypes.number,
  }

  static defaultProps = {
    color: DEFAULT_STROKE_COLOR,
    strokeWidth: DEFAULT_STROKE_WIDTH,
  }

  componentWillMount = () => {
    this.totalLength = this.getTotalLength();
  }

  getOffsetLength = () => {
    return this.totalLength - (
      this.totalLength * this.props.progress
    );
  }

  /**
   * Should calculate the same value as the DOM Path.getTotalLength() method
   *
   * @returns {number} - Total length of all points
   */
  getTotalLength() {
    return this.props.points.reduce((total, point, i, points) => {

      // if this isn't the first point
      if (i) {
        return this.distance(points[i - 1], point) + total;
      }
      return total;
    }, 0);
  }

  /**
   * Calculate the distance between two points on a plane
   *
   * @param {object} p1 - first point object {x, y}
   * @param {object} p2 - second point object {x, y}
   * @returns {number} - distance between <p1> and <p2>
   */
  distance(p1, p2) {
    let
      dy = p1.y - p2.y,
      dx = p1.x - p2.x;
    // Pythagorean Theorem
    return Math.sqrt(
      (dx * dx) + (dy * dy)
    );
  }

  /**
   * Reduce all points into a string for plotting the svg <path>
   *
   * @returns {string} - All points to use as d attribute of an svg path
   */
  d() {
    const {points} = this.props;
    if(!points || !points.length) return '';
    return points.reduce(
      (d, point) => `${d}L${point.x},${point.y}`,
      `M${points[0].x},${points[0].y}`
    );
  }

  render() {
    const {color, trace, strokeWidth} = this.props;

    let pathStyles;
    if (trace) {
      // line needs to appear to draw itself
      pathStyles = {
        strokeDasharray: this.totalLength,
        strokeDashoffset: this.getOffsetLength(),
      };
    }

    return (
      <path
        fill="transparent"
        stroke={color}
        strokeWidth={3}
        d={this.d()}
        style={pathStyles}
        />
    );
  }
}