import React, { SVGProps } from 'react';

const IconCoin98: React.FC<SVGProps<SVGSVGElement>> = props => (

  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
    className='max-w-full max-h-full'>
    <path d="M0 0H16V16H0V0Z" fill="url(#coin98)" />
    <defs>
      <pattern id="coin98" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0_821_58" transform="scale(0.00341297)" />
      </pattern>
      <image id="image0_821_58" width="293" height="293"
        href="data:image/png;base64,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" />
    </defs>
  </svg>



  );

  export default IconCoin98;