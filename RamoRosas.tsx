// RamoRosas.tsx
import React from 'react';
import './RamoRosas.css';

const RamoRosas = () => {
  return (
    <div className="ramo-container">
      <svg className="ramo-svg" viewBox="0 0 500 500">
        <g className="ramo" transform="translate(250, 420)">
          
          {/* Envoltorio del ramo */}
          <g className="envoltorio">
            <path d="M -120 0 
                     C -160 -40, -160 -80, -120 -100
                     C -80 -120, 80 -120, 120 -100
                     C 160 -80, 160 -40, 120 0
                     Z" 
                  fill="#e8f5e9" stroke="#81c784" strokeWidth="3" />
            
            <path d="M -120 0 
                     C -140 -20, -140 -40, -120 -60
                     C -100 -80, 100 -80, 120 -60
                     C 140 -40, 140 -20, 120 0
                     Z" 
                  fill="#f1f8e9" stroke="#a5d6a7" strokeWidth="2" />
          </g>
          
          {/* Lazo */}
          <g className="lazo" transform="translate(0, -70)">
            <path d="M -50 -10 
                     C -70 -40, -40 -60, 0 -50
                     C 40 -60, 70 -40, 50 -10
                     C 70 0, 40 20, 0 30
                     C -40 20, -70 0, -50 -10
                     Z" 
                  fill="#ff80ab" />
            <path d="M -30 -15 
                     C -45 -30, -25 -40, 0 -35
                     C 25 -40, 45 -30, 30 -15
                     C 45 -10, 25 5, 0 10
                     C -25 5, -45 -10, -30 -15
                     Z" 
                  fill="#f8bbd0" />
          </g>

          {/* Rosas centrales (más grandes) */}
          <g className="rosa" transform="rotate(0)">
            <path className="tallo" d="M 0 0 V -220" />
            <g transform="translate(0, -220)">
              <path className="petalo" d="M0,0 C-15,-25 15,-25 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-15,-25 15,-25 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-15,-25 15,-25 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-15,-25 15,-25 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-15,-25 15,-25 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="8" fill="#f57f17" />
            </g>
            <path className="hoja" d="M 0 -100 
                                     C 10 -110, 30 -105, 30 -90
                                     C 30 -75, 15 -70, 0 -80
                                     Z" />
          </g>

          <g className="rosa" transform="rotate(-15)">
            <path className="tallo" d="M 0 0 V -200" />
            <g transform="translate(0, -200)">
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="7" fill="#f57f17" />
            </g>
          </g>

          <g className="rosa" transform="rotate(15)">
            <path className="tallo" d="M 0 0 V -200" />
            <g transform="translate(0, -200)">
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-14,-23 14,-23 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="7" fill="#f57f17" />
            </g>
            <path className="hoja" d="M 0 -90 
                                     C -10 -100, -30 -95, -30 -80
                                     C -30 -65, -15 -60, 0 -70
                                     Z" />
          </g>

          {/* Rosas laterales izquierdas */}
          <g className="rosa" transform="rotate(-30)">
            <path className="tallo" d="M 0 0 V -180" />
            <g transform="translate(0, -180)">
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="6" fill="#f57f17" />
            </g>
          </g>

          <g className="rosa" transform="rotate(-45)">
            <path className="tallo" d="M 0 0 V -160" />
            <g transform="translate(0, -160)">
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="5" fill="#f57f17" />
            </g>
          </g>

          <g className="rosa" transform="rotate(-60)">
            <path className="tallo" d="M 0 0 V -140" />
            <g transform="translate(0, -140)">
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="4" fill="#f57f17" />
            </g>
          </g>

          <g className="rosa" transform="rotate(-75)">
            <path className="tallo" d="M 0 0 V -120" />
            <g transform="translate(0, -120)">
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="3" fill="#f57f17" />
            </g>
          </g>

          {/* Rosas laterales derechas */}
          <g className="rosa" transform="rotate(30)">
            <path className="tallo" d="M 0 0 V -180" />
            <g transform="translate(0, -180)">
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-13,-22 13,-22 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="6" fill="#f57f17" />
            </g>
            <path className="hoja" d="M 0 -100 
                                     C 10 -110, 30 -105, 30 -90
                                     C 30 -75, 15 -70, 0 -80
                                     Z" />
          </g>

          <g className="rosa" transform="rotate(45)">
            <path className="tallo" d="M 0 0 V -160" />
            <g transform="translate(0, -160)">
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-12,-20 12,-20 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="5" fill="#f57f17" />
            </g>
          </g>

          <g className="rosa" transform="rotate(60)">
            <path className="tallo" d="M 0 0 V -140" />
            <g transform="translate(0, -140)">
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-10,-18 10,-18 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="4" fill="#f57f17" />
            </g>
          </g>

          <g className="rosa" transform="rotate(75)">
            <path className="tallo" d="M 0 0 V -120" />
            <g transform="translate(0, -120)">
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(72)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(144)" fill="#ffeb3b" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(216)" fill="#fdd835" />
              <path className="petalo" d="M0,0 C-9,-16 9,-16 0,0 Z" transform="rotate(288)" fill="#ffc107" />
              <circle cx="0" cy="0" r="3" fill="#f57f17" />
            </g>
            <path className="hoja" d="M 0 -70 
                                     C -10 -80, -30 -75, -30 -60
                                     C -30 -45, -15 -40, 0 -50
                                     Z" />
          </g>

          {/* Rosas traseras */}
          <g className="rosa" transform="rotate(-10) translate(0, 10)">
            <path className="tallo" d="M 0 0 V -190" />
            <g transform="translate(0, -190)">
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" fill="#ffeb3b" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(72)" fill="#fdd835" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(144)" fill="#ffeb3b" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(216)" fill="#fdd835" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(288)" fill="#ffc107" opacity="0.8" />
              <circle cx="0" cy="0" r="6" fill="#f57f17" opacity="0.8" />
            </g>
          </g>

          <g className="rosa" transform="rotate(10) translate(0, 10)">
            <path className="tallo" d="M 0 0 V -190" />
            <g transform="translate(0, -190)">
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" fill="#ffeb3b" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(72)" fill="#fdd835" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(144)" fill="#ffeb3b" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(216)" fill="#fdd835" opacity="0.8" />
              <path className="petalo" d="M0,0 C-12,-21 12,-21 0,0 Z" transform="rotate(288)" fill="#ffc107" opacity="0.8" />
              <circle cx="0" cy="0" r="6" fill="#f57f17" opacity="0.8" />
            </g>
          </g>

        </g>
      </svg>
    </div>
  );
};

export default RamoRosas;