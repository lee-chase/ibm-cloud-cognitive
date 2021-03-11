import React from 'react';
import { string } from 'prop-types';

export const CanarySvg2 = React.forwardRef(({ title }, ref) => (
  <svg
    className="canary--svg"
    viewBox="0 0 528 483"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}>
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
      <g id="Group-3" transform="translate(0.688842, 1.000000)">
        <path
          d="M1.92948275,234.117157 C8.10131706,211.075302 15.895209,195.074472 25.3111585,186.114666 L25.3111585,441.69397 C3.77813337,325.975505 -4.01575854,256.783234 1.92948275,234.117157 Z"
          id="Polygon"
          stroke="#979797"
          fill="#FFF91C"></path>
        <path
          d="M223.929483,162.117157 C230.101317,139.075302 237.895209,123.074472 247.311158,114.114666 L247.311158,369.69397 C225.778133,253.975505 217.984241,184.783234 223.929483,162.117157 Z"
          id="Polygon"
          stroke="#979797"
          fill="#FFF91C"
          transform="translate(234.655579, 241.904318) scale(-1, 1) rotate(55.000000) translate(-234.655579, -241.904318) "></path>
        <path
          d="M100.311158,441.69397 C155.539633,441.69397 200.311158,307.228475 200.311158,252 C200.311158,196.771525 155.539633,152 100.311158,152 C45.0826835,152 0.311158471,196.771525 0.311158471,252 C0.311158471,307.228475 45.0826835,441.69397 100.311158,441.69397 Z"
          id="Oval"
          stroke="#979797"
          fill="#FFF91C"></path>
        <g
          id="Group"
          transform="translate(25.311158, 13.000000)"
          stroke="#979797">
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
          <circle
            id="Oval"
            fill="#000000"
            cx="44.5"
            cy="49.5"
            r="12.5"></circle>
          <circle
            id="Oval"
            fill="#000000"
            cx="106.5"
            cy="49.5"
            r="12.5"></circle>
          <circle id="Oval" fill="#FFFFFF" cx="41" cy="50" r="6"></circle>
          <circle id="Oval" fill="#FFFFFF" cx="103" cy="50" r="6"></circle>
        </g>
        <circle
          id="Oval"
          fill="url(#radialGradient-1)"
          cx="51.3111585"
          cy="102"
          r="20"></circle>
        <circle
          id="Oval"
          fill="url(#radialGradient-1)"
          cx="149.311158"
          cy="102"
          r="20"></circle>
        <polygon
          id="Polygon"
          stroke="#979797"
          fill="#FCCC7C"
          transform="translate(64.375914, 402.250000) scale(1, -1) translate(-64.375914, -402.250000) "
          points="64.3759137 362.5 90.8759137 442 64.3759137 399.5 37.8759137 442"></polygon>
        <polygon
          id="Polygon"
          stroke="#979797"
          fill="#FCCC7C"
          transform="translate(136.375914, 402.250000) scale(1, -1) translate(-136.375914, -402.250000) "
          points="136.375914 362.5 162.875914 442 136.375914 399.5 109.875914 442"></polygon>
        <g
          id="Group-2"
          transform="translate(325.811158, 240.500000) rotate(10.000000) translate(-325.811158, -240.500000) translate(160.311158, 26.000000)">
          <polygon
            id="Rectangle"
            stroke="#979797"
            fill="#FFFFFF"
            points="5.79060237e-13 0 331 0 331 26.6889648 323.273651 29.0883331 331 30.4973907 331 69 5.79060237e-13 69 4.54747351e-13 34.5 8.72035217 32.1985016 4.54603803e-13 29.0883331"></polygon>
          <polygon
            id="Rectangle"
            stroke="#979797"
            fill="#FFFFFF"
            points="2.01684069e-12 70 331 70 331 119.151031 323.745605 124.365341 331 126.204102 331 139 2.01684069e-12 139 1.51944559e-12 81.0154419 7.22203064 77.4737244 4.54747351e-13 75.8314819"></polygon>
          <polygon
            id="Rectangle"
            stroke="#979797"
            fill="#FFFFFF"
            points="3.70785434e-13 140 331 140 331 148.1828 325.08432 150.696686 331 152.307739 331 209 3.70785434e-13 209 -7.17741838e-17 202.230133 9.12849426 199.45459 0 197.096069"></polygon>
          <text
            id="More-info-here."
            fontFamily="IBMPlexSans-Bold, IBM Plex Sans"
            fontSize="64"
            fontWeight="bold"
            fill="#4A4A4A">
            <tspan x="30.744" y="87">
              More info
            </tspan>
            <tspan x="93.752" y="171">
              here.
            </tspan>
          </text>
          <rect
            id="Rectangle"
            stroke="#979797"
            fill="#FFFFFF"
            x="155"
            y="209"
            width="32"
            height="220"></rect>
        </g>
      </g>
    </g>
  </svg>
));
CanarySvg2.propTypes = {
  title: string,
};
