import React from 'react';
import { string } from 'prop-types';

export const CanarySvg = ({ title }) => (
  <svg viewBox="0 0 202 431" version="1.1">
    <title>{title}</title>
    <defs>
      <radialGradient
        cx="50%"
        cy="50%"
        fx="50%"
        fy="50%"
        r="50%"
        id="radialGradient-1">
        <stop stopColor="#FCCC7C" offset="0%"></stop>
        <stop stopColor="#FCCC7C" stopOpacity="0" offset="100%"></stop>
      </radialGradient>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M2.61832428,222.117157 C8.79015859,199.075302 16.5840505,183.074472 26,174.114666 L26,429.69397 C4.46697489,313.975505 -3.32691701,244.783234 2.61832428,222.117157 Z"
        id="Polygon"
        stroke="#979797"
        fill="#FFF91C"></path>
      <path
        d="M177.618324,222.117157 C183.790159,199.075302 191.58405,183.074472 201,174.114666 L201,429.69397 C179.466975,313.975505 171.673083,244.783234 177.618324,222.117157 Z"
        id="Polygon"
        stroke="#979797"
        fill="#FFF91C"
        transform="translate(188.344421, 301.904318) scale(-1, 1) translate(-188.344421, -301.904318) "></path>
      <path
        d="M101,429.69397 C156.228475,429.69397 201,295.228475 201,240 C201,184.771525 156.228475,140 101,140 C45.771525,140 1,184.771525 1,240 C1,295.228475 45.771525,429.69397 101,429.69397 Z"
        id="Oval"
        stroke="#979797"
        fill="#FFF91C"></path>
      <g id="Group" transform="translate(26.000000, 1.000000)" stroke="#979797">
        <circle id="Oval" fill="#FFF91C" cx="75" cy="75" r="75"></circle>
        <polygon
          id="Polygon"
          fill="#FCCC7C"
          points="74.5 89.3118286 112 107 74.5 132 37 107"></polygon>
        <polygon
          id="Polygon"
          fill="#000000"
          points="74.5 109.689514 113 106.5 74.5 120.613281 38 106.5"></polygon>
        <circle id="Oval" fill="#FFFFFF" cx="44" cy="50" r="25"></circle>
        <circle id="Oval" fill="#FFFFFF" cx="106" cy="50" r="25"></circle>
        <circle id="Oval" fill="#000000" cx="44.5" cy="49.5" r="12.5"></circle>
        <circle id="Oval" fill="#000000" cx="106.5" cy="49.5" r="12.5"></circle>
        <circle id="Oval" fill="#FFFFFF" cx="41" cy="50" r="6"></circle>
        <circle id="Oval" fill="#FFFFFF" cx="103" cy="50" r="6"></circle>
      </g>
      <circle
        id="Oval"
        fill="url(#radialGradient-1)"
        cx="52"
        cy="90"
        r="20"></circle>
      <circle
        id="Oval"
        fill="url(#radialGradient-1)"
        cx="150"
        cy="90"
        r="20"></circle>
      <polygon
        id="Polygon"
        stroke="#979797"
        fill="#FCCC7C"
        transform="translate(65.064755, 390.250000) scale(1, -1) translate(-65.064755, -390.250000) "
        points="65.0647552 350.5 91.5647552 430 65.0647552 387.5 38.5647552 430"></polygon>
      <polygon
        id="Polygon"
        stroke="#979797"
        fill="#FCCC7C"
        transform="translate(137.064755, 390.250000) scale(1, -1) translate(-137.064755, -390.250000) "
        points="137.064755 350.5 163.564755 430 137.064755 387.5 110.564755 430"></polygon>
    </g>
  </svg>
);

CanarySvg.propTypes = {
  title: string,
};
