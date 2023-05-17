import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let intervalID;


const pokedex_arrays = [
  ['national', 'https://pokeapi.co/api/v2/pokedex/1/', 898],
  ['kanto', 'https://pokeapi.co/api/v2/pokedex/2/', 151],
  ['original-johto', 'https://pokeapi.co/api/v2/pokedex/3/', 251],
  ['hoenn', 'https://pokeapi.co/api/v2/pokedex/4/', 202],
  ['original-sinnoh', 'https://pokeapi.co/api/v2/pokedex/5/', 151],
  ['extended-sinnoh', 'https://pokeapi.co/api/v2/pokedex/6/', 210],
  ['updated-johto', 'https://pokeapi.co/api/v2/pokedex/7/', 256],
  ['original-unova', 'https://pokeapi.co/api/v2/pokedex/8/', 156],
  ['updated-unova', 'https://pokeapi.co/api/v2/pokedex/9/', 301],
  ['conquest-gallery', 'https://pokeapi.co/api/v2/pokedex/11/', 200],
  ['kalos-central', 'https://pokeapi.co/api/v2/pokedex/12/', 150],
  ['kalos-coastal', 'https://pokeapi.co/api/v2/pokedex/13/', 153],
  ['kalos-mountain', 'https://pokeapi.co/api/v2/pokedex/14/', 151],
  ['updated-hoenn', 'https://pokeapi.co/api/v2/pokedex/15/', 211],
  ['original-alola', 'https://pokeapi.co/api/v2/pokedex/16/', 302],
  ['original-melemele', 'https://pokeapi.co/api/v2/pokedex/17/', 120],
  ['original-akala', 'https://pokeapi.co/api/v2/pokedex/18/', 130],
  ['original-ulaula', 'https://pokeapi.co/api/v2/pokedex/19/', 130],
  ['original-poni', 'https://pokeapi.co/api/v2/pokedex/20/', 100],
  ['updated-alola', 'https://pokeapi.co/api/v2/pokedex/21/', 403],
  ['updated-melemele', 'https://pokeapi.co/api/v2/pokedex/22/', 150],
  ['updated-akala', 'https://pokeapi.co/api/v2/pokedex/23/', 160],
  ['updated-ulaula', 'https://pokeapi.co/api/v2/pokedex/24/', 160],
  ['updated-poni', 'https://pokeapi.co/api/v2/pokedex/25/', 130],
  ['letsgo-kanto', 'https://pokeapi.co/api/v2/pokedex/26/', 153],
  ['galar', 'https://pokeapi.co/api/v2/pokedex/27/', 400],
  ['isle-of-armor', 'https://pokeapi.co/api/v2/pokedex/28/', 211],
  ['crown-tundra', 'https://pokeapi.co/api/v2/pokedex/29/', 210],
  ['hisui', 'https://pokeapi.co/api/v2/pokedex/30/', 242],
];

const pokemon_types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow',];

function Tabs(props) {
  if (props.cardToChange === 'search-card') {
    return (
      <div className='flex-row form-tabs'>
        <button
          className='change-card-face-Tabs form-tab'
          onClick={() => { props.changeCardFace(0, props.cardToChange) }}
        >Form
        </button>
        <button
          className='change-card-face-Tabs types-tab'
          onClick={() => { props.changeCardFace(1, props.cardToChange) }}
        >Types
        </button>
        <button
          className='change-card-face-Tabs options-tab'
          onClick={() => { props.changeCardFace(2, props.cardToChange) }}
        >Options
        </button>
      </div>
    )
  } else {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      if ((i === 2 && !props.has_evolutions) || (i === 3 && !props.has_forms)) {
        arr.push(
          <button
            className={i === props.pkmCurrentFace ? `activeTab tab change-card-face-tab tab-${i + 1}` : `inactiveTab tab change-card-face-tab tab-${i + 1}`}
            disabled
            style={{
              background: '#888',
              color: '#000'
            }}
          >N/A
          </button>
        )
      } else {
        arr.push(
          <button
            className={i === props.pkmCurrentFace ? `activeTab tab change-card-face-tab tab-${i + 1}` : `inactiveTab tab change-card-face-tab tab-${i + 1}`}
            onClick={() => { props.changeCardFace(i, props.cardToChange) }}
            style={{
              background: props.color,
            }}
          >{i + 1}
          </button>
        )
      };
    }
    return (
      <div className='tabs'>
        {arr}
        <button
          className='tab tab-erase-pokemon'
          onClick={() => { props.changeCardFace(undefined, props.cardToChange, true) }}
        >
          <span className='tab-icon-erase'>+</span>
        </button>
      </div>
    )
  }
}

function PkmFormTypes(props) {
  const arr = [];

  pokemon_types.forEach((item) => {
    let checked = props.types.includes(item);
    if (props.types.length === 3) {
      arr.push(
        <div className='type-wrap  flex-column'>
          <label for={item}>{item}</label><br></br>
          <input type='checkbox' id={`type-checkbox-${item}`} name='types' value={item} onChange={props.handleChange} checked={checked} disabled={!checked}></input>
        </div>)
    } else {
      arr.push(
        <div className='type-wrap  flex-column'>
          <label for={item}>{item}</label><br></br>
          <input type='checkbox' id={`type-checkbox-${item}`} name='types' value={item} onChange={props.handleChange} checked={checked}></input>
        </div>)
    }
  })
  return (
    <div className='main-wrap'>
      <Tabs
        changeCardFace={props.changeCardFace}
        cardToChange={'search-card'}
      />
      <div className='form-container types-tab-container flex-column'>
        <p>Only Pokemons with types:</p>
        <div className='types-container'>
          {arr}
        </div>
      </div>
    </div>

  )
}

function PkmSelectionForm(props) {
  let max_quantity = pokedex_arrays[pokedex_arrays.findIndex((item) => { return item[0] === props.pokedex_type })][2];
  let selected_types = <p>All Types</p>;

  if (props.types.length > 0) {
    let str = ' ';
    props.types.forEach((item) => {
      str += `${item[0].toUpperCase() + item.slice(1)}, `;
    });
    str = str.slice(0, str.length - 2);
    selected_types = <p>{str}</p>;
  }

  const handleChange = (event) => {
    if (event.target.type !== 'checkbox') { event.preventDefault() }
    props.inputValueChange(event.target.name, event.target.value, event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.searchParameters(props.pkm_search_index, props.quantity);
  }

  if (props.searching) {
    return (
      <div id='pokeball-container'>
        <div className='illumination light'></div>
        <div id='pokeball'>
          <div id='pokeball-line'></div>
          <div className='pokeball-button-band black'></div>
          <div className='pokeball-button-band white'></div>
          <div id='pokeball-button'></div>
        </div>
      </div>)
  } else {
    if (props.searchCardFace === 0) {
      return (
        <div className='main-wrap'>
          <Tabs
            changeCardFace={props.changeCardFace}
            cardToChange={'search-card'}
          />
          <div className='form-container flex-row'>
            <form className='flex-column' onSubmit={handleSubmit}>
              <div className='flex-column pokedex_type_wrp form-divider'>
                <label className='form-label' for='pokedex_type'>Choose pokedex:</label>
                <select className='form-select' id='pokedex-type' name='pokedex_type' onChange={handleChange} value={props.pokedex_type}>
                  <option value='national'>national</option>
                  <option value='kanto'>kanto</option>
                  <option value='original-johto'>original-johto</option>
                  <option value='hoenn'>hoenn</option>
                  <option value='original-sinnoh'>original-sinnoh</option>
                  <option value='extended-sinnoh'>extended-sinnoh</option>
                  <option value='updated-johto'>updated-johto</option>
                  <option value='original-unova'>original-unova</option>
                  <option value='updated-unova'>updated-unova</option>
                  <option value='conquest-gallery'>conquest-gallery</option>
                  <option value='kalos-central'>kalos-central</option>
                  <option value='kalos-coastal'>kalos-coastal</option>
                  <option value='kalos-mountain'>kalos-mountain</option>
                  <option value='updated-hoenn'>updated-hoenn</option>
                  <option value='original-alola'>original-alola</option>
                  <option value='original-melemele'>original-melemele</option>
                  <option value='original-akala'>original-akala</option>
                  <option value='original-ulaula'>original-ulaula</option>
                  <option value='original-poni'>original-poni</option>
                  <option value='updated-alola'>updated-alola</option>
                  <option value='updated-melemele'>updated-melemele</option>
                  <option value='updated-akala'>updated-akala</option>
                  <option value='updated-ulaula'>updated-ulaula</option>
                  <option value='updated-poni'>updated-poni</option>
                  <option value='letsgo-kanto'>letsgo-kanto</option>
                  <option value='galar'>galar</option>
                  <option value='isle-of-armor'>isle-of-armor</option>
                  <option value='crown-tundra'>crown-tundra</option>
                  <option value='hisui'>hisui</option>
                </select>
                <label className='form-label'>Pokemon in pokedex: {max_quantity}</label>
              </div>
              <div className='flex-column pkm_index_wrp form-divider'>
                <label className='form-label' for='pkm_index'>Index:</label>
                <div id='input-wp-index' className='input-wp'>
                  <button
                    form='#'
                    onMouseDown={(e) => { e.preventDefault(); props.mousePress(e, false, 'pkm_index', max_quantity) }}
                    onMouseUp={(e) => { e.preventDefault(); props.mouseRelease(e, false) }}
                    onMouseOut={(e) => { e.preventDefault(); props.mouseRelease(e) }}
                    className='btn-form-number'
                  >◄</button>
                  <input
                    className='form-number index-search'
                    type='number'
                    name='pkm_index'
                    onChange={handleChange}
                    value={props.pkm_search_index || ''}
                    step='1'
                    min={1}
                    max={max_quantity}
                    required
                  ></input>
                  <button
                    form='#'
                    onMouseDown={(e) => { e.preventDefault(); props.mousePress(e, true, 'pkm_index', max_quantity) }}
                    onMouseUp={(e) => { e.preventDefault(); props.mouseRelease(e, false) }}
                    onMouseOut={(e) => { e.preventDefault(); props.mouseRelease(e) }}
                    className='btn-form-number'
                  >►</button>
                </div>
              </div>
              <div className='flex-column quantity_wrp form-divider'>
                <label className='form-label'>Quantity:</label>
                <div id='input-wp-quantity' className='input-wp'>
                  <button
                    form='#'
                    onMouseDown={(e) => { e.preventDefault(); props.mousePress(e, false, 'quantity', max_quantity) }}
                    onMouseUp={(e) => { e.preventDefault(); props.mouseRelease(e) }}
                    onMouseOut={(e) => { e.preventDefault(); props.mouseRelease(e) }}
                    className='btn-form-number'
                  >◄</button>
                  <input
                    className='form-number search-amount'
                    type='number'
                    name='quantity'
                    onChange={handleChange}
                    value={props.quantity || ''}
                    step='1'
                    min={1}
                    max={max_quantity}
                    required
                  ></input>
                  <button
                    form='#'
                    onMouseDown={(e) => { e.preventDefault(); props.mousePress(e, true, 'quantity', max_quantity) }}
                    onMouseUp={(e) => { e.preventDefault(); props.mouseRelease(e) }}
                    onMouseOut={(e) => { e.preventDefault(); props.mouseRelease(e) }}
                    className='btn-form-number'
                  >►</button>
                </div>
              </div>

              <div className='flex-column checkboxes form-divider'>
                <label>Only search pokemon with:</label>
                <div className='flex-row two-checkboxes'>
                  <div className='checkbox-wrp flex-column'>
                    <label for="evolution-checkbox">Evolutions</label><br></br>
                    <input type='checkbox' id='evolution-checkbox' name='evolution_available' onChange={handleChange} value={'evolution'} checked={props.evoCheck}></input>
                  </div>
                  <div className='checkbox-wrp flex-column'>
                    <label for="forms-checkbox">Forms</label><br></br>
                    <input type='checkbox' id='forms-checkbox' name='forms_available' onChange={handleChange} value={'forms'} checked={props.formsCheck}></input>
                  </div>
                </div>
              </div>
              <span className='selected-types form-divider'>Selected types: {selected_types}</span>
              <input type='submit' className='submit' value='Search'></input>
            </form>
          </div >
        </div >
      )
    } else if (props.searchCardFace === 1) {
      return (
        <PkmFormTypes
          types={props.types}
          handleChange={handleChange}
          changeCardFace={props.changeCardFace}
        />
      )
    } else {
      return (
        <div className='main-wrap'>
          <Tabs
            changeCardFace={props.changeCardFace}
            cardToChange={'search-card'}
          />
          <div className='form-container  flex-row'>
            <form className='options flex-column'>
              <div className='custom-box'>
                <label>Amount of pokemon shown</label>
                <select name='maxPokemonShown' onChange={handleChange} value={props.maxPokemonShown}>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>All</option>
                </select>
              </div>
              <div className='custom-box'>
                <label>change all card faces to</label>
                <select name='pkmCardFace' onChange={handleChange} value={props.pkmCardFace}>
                  <option>Main</option>
                  <option>Stats</option>
                  <option>Evolutions</option>
                  <option>Forms</option>
                </select>
              </div>
              <div className='custom-box'>
                <label>Clear cards</label>
                <button name='clear' onClick={handleChange}>Clear</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

}

function PkmName(props) {
  return (
    <h3 className='Pkm-name'>{props.name ? props.name : 'Pkm_Name'}</h3>
  )
}

function PkmIndex(props) {
  return (
    <div className='flex-column'>
      <div className='pkm-index'>
        <h3>#{props.index}</h3>
      </div>
    </div>
  )
}

function PkmIdentifierWrapper(props) {
  return (
    <div className='flex-column pkm-identity-wrapper'>
      <PkmIndex
        index={props.index}
      />
      <PkmName
        name={props.name}
      />
    </div>
  )
}

function PkmWeight(props) {
  const kg = Math.round((props.weight * .1) * 10) / 10;
  const Lbs = Math.round((kg * 2.20462262) * 10) / 10
  return (
    <div className='weight flex-column'>
      <span>Weight</span>
      <span>{kg}kg</span>
      <span>{Lbs}Lbs</span>
    </div>
  )
}

function PkmHeight(props) {
  const m = props.height * .1;
  const inches = (m / 0.0254).toFixed(0);
  const feet = Math.floor(inches / 12);

  return (
    <div className='flex-column'>
      <span>Height</span>
      <span>{m.toFixed(1)}M</span>
      <span>{feet}'{inches % 12}''</span>
    </div>
  )
}

function PkmImage(props) {
  return (
    <img
      src={props.src}
      className='pkm-sprite'
    />
  )
}

function PkmPhysicalAppearanceWrapper(props) {
  return (
    <div className='pkm-pa-wr flex-row custom-box'>
      <PkmHeight
        height={props.height}
      />
      <PkmImage
        src={props.src}
      />
      <PkmWeight
        weight={props.weight}
      />
    </div>
  )
}

function UlContainer(props) {
  let arr = [];
  let counter = 0;
  for (let item of props.list) {
    arr.push(<li key={`types-${item[props.list_type].name}-${counter}`}>{item[props.list_type].name}</li>)
    counter++
  }
  return (
    <div className={`${props.div_class} half flex-column`}>
      <h4>{props.header}</h4>
      <ul className={`${props.ul_class} ls-style-none`}>
        {arr}
      </ul>
    </div>
  )
}

function PkmNatureWrapper(props) {
  return (
    <div className='traits-wrp flex-row custom-box'>
      <UlContainer
        list_type='type'
        list={props.types}
        div_class='types'
        ul_class='types-ul'
        header='Types'
      />
      <UlContainer
        list_type='ability'
        list={props.moves}
        div_class='moves'
        ul_class='moves-ul'
        header='Moves'
      />
    </div>
  )
}

function PkmDescription(props) {
  return (
    <div
      className='description custom-box'
    >
      <p
      >{props.description}</p>
    </div>
  )
}

function PkmFirstFace(props) {
  return (
    <div className='type-phys-description flex-column'>

      <PkmPhysicalAppearanceWrapper
        height={props.height}
        weight={props.weight}
        src={props.src}
      />
      <PkmNatureWrapper
        types={props.types}
        moves={props.moves}
      />
      <PkmDescription
        description={props.description}
      />
    </div>
  )
}

function Ecology(props) {
  const arr = [];
  for (let item of props.paragraph) {
    arr.push(
      <div className='flex-row'>
        <p>{item.label}</p><p className='capitalize'>{item.value}</p>
      </div>
    )
  }
  return (
    <div className='ecology flex-column custom-box'>
      <p className='genus'>{props.genus}</p>
      <div className='ecology-a flex-column'>
        {arr}
      </div>
    </div>
  )
}

function InfoWrapper(props) {
  const arr = props.stats.map((item) => {
    return (
      <div className='info-wrp flex-column'>
        <div className='label'>{item.stat.name}</div>
        <div className='value'>{item.base_stat}</div>
      </div>
    )
  })

  return (
    <div className='stats-wrp flex-column custom-box'>
      <div className='a-stats flex-row'>
        <img
          className='pkm-sprite'
          src={props.src}
        />
        <div className='flex-column'>
          {arr[0]}
          {arr[1]}
        </div>
        <div className='flex-column'>
          {arr[5]}
          {arr[2]}
        </div>
      </div>
      <div className='flex-column'>
        {arr[3]}
        {arr[4]}
      </div>
    </div>
  )
}

function PkmSecondFace(props) {
  let genus = undefined;

  for (let item of props.genera) {
    if (item.language.name === 'en') {
      genus = item.genus;
    }
  }
  return (
    <div className='w100 flex-column'>
      <InfoWrapper
        stats={props.stats}
        src={props.src}
      />
      <Ecology
        genus={genus}
        paragraph={[{
          label: 'Habitat', value: (props.habitat === undefined ? 'N/A' : props.habitat)
        },
        { label: 'Shape', value: props.shape.name }
        ]}
      />
    </div>
  )
}



function Evolution(props) {
  let arr = [];
  let from = <div className='first-img-3rd-tab flex-column'>
    <img className='evo-from evo-sprite' src={props.evoFrom.evoSprite} />
    <p className='evo-p'>{props.evoFrom.name}</p>
  </div>

  arr.push(
    <div className='evo-div-2 flex-column'>
      <div className='evo-div-1 flex-column'>
        <img className='evo-sprite' src={props.evolution_chain[props.carrousel_index].evo.evoSprite} />
        <p className='evo-p'>{props.evolution_chain[props.carrousel_index].evo.evoName}</p>
      </div>
    </div>
  )

  if (props.evolution_chain[props.carrousel_index].nextEvo) {
    arr.push(
      <div className='evo-div-2 flex-column'>
        <div className='evo-div-1 flex-column'>
          <img className='evo-sprite' src={props.evolution_chain[props.carrousel_index].nextEvo.evoSprite} />
          <p className='evo-p'>{props.evolution_chain[props.carrousel_index].nextEvo.evoName}</p>
        </div>
      </div>
    )
  }

  if (props.evolution_chain.length > 1) {
    return (
      <div className='evo-wrp flex-column'>
        {from}
        <div className='evo-ctrl flex-row'>
          <button className='carrousel-prev' onClick={() => { props.switchEvo(-1, props.index) }}>◄</button>
          <button className='carrousel-next' onClick={() => { props.switchEvo(1, props.index) }}>►</button>
        </div>
        <div className='carrousel flex-row'>
          {arr}
        </div>
      </div>
    )
  } else {
    return (
      <div className='evo-wrp flex-column'>
        {from}
        <div className='gap evo-ctrl flex-row'>
        </div>
        <div className='carrousel flex-row'>
          {arr}
        </div>
      </div>
    )
  }

}

function PkmForms(props) {
  if (props.forms.length > 2) {
    let arr = [];
    let face_indexes = props.forms_index * 2;
    for (let i = 0; i < 2; i++) {
      if (props.forms[i + face_indexes] === undefined) { break }
      arr.push(
        <div className="form-item flex-column">
          <img className='form-sprite' src={props.forms[i + face_indexes].img_src} alt={props.forms[i + face_indexes].name} />
          <p className="form-name">Form: {props.forms[i + face_indexes].form_name}</p>
        </div>
      )
    }
    if (face_indexes === 0) {
      return (
        <div className='form-face-wrp'>
          <button
            className='form-card-btn-previous' disabled>
            ◄
          </button>
          <div className="forms-wrp custom-box">
            {arr}
          </div>
          <button className='form-card-btn-next' onClick={() => { props.switchFormFace(1, props.index) }}>
            ►
          </button>

        </div>
      )
    } else if (props.forms[face_indexes + 2] === undefined) {
      return (
        <div className='form-face-wrp'>
          <button
            className='form-card-btn-previous'
            onClick={() => { props.switchFormFace(props.forms_index - 1, props.index) }}
          >
            ◄
          </button>
          <div className="forms-wrp custom-box">
            {arr}
          </div>
          <button
            className='form-card-btn-next'
            disabled
          >
            ►
          </button>

        </div>
      )
    } else {
      return (
        <div className='form-face-wrp'>
          <button className='form-card-btn-previous'
            onClick={() => { props.switchFormFace(props.forms_index - 1, props.index) }}>◄</button>
          <div className="forms-wrp custom-box">
            {arr}
          </div>
          <button className='form-card-btn-previous'
            onClick={() => { props.switchFormFace(props.forms_index + 1, props.index) }} >►</button>
        </div>
      )
    }
  } else {
    return (
      <div className='form-face-wrp'>
        <button className='form-card-btn-previous' disabled>◄</button>
        <div className="forms-wrp custom-box">
          {
            props.forms.map(element => {
              return (
                <div className="form-item flex-column">
                  <img className='form-sprite' src={element.img_src} alt={element.name} />
                  <p className="form-name">Form: {element.form_name}</p>
                </div>
              )
            })
          }
        </div>
        <button className='form-card-btn-next' disabled>►</button>
      </div>
    )
  }
}



function FirstFace(props) {
  return (
    <div className='main-wrap'
    >
      <Tabs
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        cardToChange={props.index}
        has_forms={props.has_forms}
        has_evolutions={props.has_evolutions}
        color={props.color}
      />
      <div className='card main-face flex-column' style={{ background: props.color }}>
        <div className='inner-card flex-column'>
          <PkmIdentifierWrapper
            index={props.index}
            name={props.name}
          />
          <PkmFirstFace
            height={props.height}
            weight={props.weight}
            src={props.src}
            types={props.types}
            moves={props.moves}
            description={props.description}
          />
        </div>
      </div>
    </div>
  )
}

function SecondFace(props) {
  return (
    <div className='main-wrap'
    >
      <Tabs
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        cardToChange={props.index}
        has_forms={props.has_forms}
        has_evolutions={props.has_evolutions}
        color={props.color}
      />
      <div className='card main-face flex-column' style={{ background: props.color }}>
        <div className='inner-card flex-column'>
          <PkmIdentifierWrapper
            index={props.index}
            name={props.name}
          />
          <PkmSecondFace
            src={props.src}
            stats={props.stats}
            habitat={props.habitat}
            genera={props.genera}
            shape={props.shape}
          />
        </div>
      </div>
    </div>
  )
}

function ThirdFace(props) {
  return (
    <div className='main-wrap'
    >
      <Tabs
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        cardToChange={props.index}
        has_forms={props.has_forms}
        has_evolutions={props.has_evolutions}
        color={props.color}
      />
      <div className='card main-face flex-column' style={{ background: props.color }}>
        <div className='inner-card flex-column'>
          <PkmIdentifierWrapper
            index={props.index}
            name={props.name}
          />
          <Evolution
            evolution_chain={props.evolution_chain}
            evoFrom={props.evoFrom}
            index={props.index}
            carrousel_index={props.carrousel_index}
            switchEvo={props.switchEvo}
          />
        </div>
      </div>
    </div>
  )
}
function FourthFace(props) {
  return (
    <div className='main-wrap'
    >
      <Tabs
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        cardToChange={props.index}
        has_forms={props.has_forms}
        has_evolutions={props.has_evolutions}
        color={props.color}
      />
      <div className='card main-face flex-column' style={{ background: props.color }}>
        <div className='inner-card flex-column'>
          <PkmIdentifierWrapper
            index={props.index}
            name={props.name}
          />
          <PkmForms
            forms={props.forms}
            forms_index={props.forms_index}
            switchFormFace={props.switchFormFace}
            index={props.index}
          />
        </div>
      </div>
    </div>
  )
}

function PkmCard(props) {
  if (props.pkmCurrentFace === 0) {
    return (
      <FirstFace
        index={props.index}
        name={props.name}
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        height={props.height}
        weight={props.weight}
        src={props.src}
        types={props.types}
        moves={props.moves}
        description={props.description}
        has_forms={props.forms !== undefined}
        has_evolutions={props.evolution_chain !== undefined}
        color={props.color}
      />
    )
  } else if (props.pkmCurrentFace === 1) {
    return (
      <SecondFace
        index={props.index}
        name={props.name}
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        src={props.src}
        stats={props.stats}
        habitat={props.habitat}
        genera={props.genera}
        shape={props.shape}
        has_forms={props.forms !== undefined}
        has_evolutions={props.evolution_chain !== undefined}
        color={props.color}
      />
    )
  } else if (props.pkmCurrentFace === 2) {
    return (
      <ThirdFace
        index={props.index}
        name={props.name}
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        evolution_chain={props.evolution_chain}
        evoFrom={props.evoFrom}
        carrousel_index={props.carrousel_index}
        switchEvo={props.switchEvo}
        has_forms={props.forms !== undefined}
        has_evolutions={true}
        color={props.color}
      />
    )
  } else if (props.pkmCurrentFace === 3) {
    return (
      <FourthFace
        index={props.index}
        name={props.name}
        pkmCurrentFace={props.pkmCurrentFace}
        changeCardFace={props.changeCardFace}
        forms={props.forms}
        has_forms={true}
        forms_index={props.forms_index}
        switchFormFace={props.switchFormFace}
        has_evolutions={props.evolution_chain !== undefined}
        color={props.color}
      />
    )
  }
}

function MainCarrousel(props) {
  const currentFace = (props.mainContainerFace + 1);
  const arr = [<button className='main-car-button main-ctrl-btn' disabled >{currentFace}</button>];

  if (props.maxPokemonShown !== 'All' || props.mainTotalFaces === 1) {
    let maxIterations = 5;

    if (props.mainTotalFaces < 5) {
      maxIterations = Number(props.mainTotalFaces);
    }

    for (let i = 1; arr.length < maxIterations; i++) {
      if (i > 500) { break }
      if (currentFace - i > 0) {
        arr.unshift(
          <button className='main-car-button main-ctrl-btn' onClick={() => { props.changeMainFace(currentFace - i) }}>{currentFace - i}</button>
        )
      }
      if (((currentFace + i) <= props.mainTotalFaces) && arr.length < 8) {
        arr.push(
          <button className='main-car-button main-ctrl-btn' onClick={() => { props.changeMainFace(currentFace + i) }}>{currentFace + i}</button>
        )
      }
    }
  }

  return (
    <div id='main-carrousel-container'>
      <div id='sub-carrousel-container'>
        <button className='main-car-button main-ctrl-btn' disabled={currentFace === 1} onClick={() => { props.changeMainFace(1) }}>◄◄</button>
        <button className='main-car-button main-ctrl-btn' disabled={currentFace === 1} onClick={() => { props.changeMainFace(currentFace - 1) }}>◄</button>
        {arr}
        <button className='main-car-button main-ctrl-btn' disabled={currentFace === props.mainTotalFaces} onClick={() => { props.changeMainFace(currentFace + 1) }}>►</button>
        <button className='main-car-button main-ctrl-btn' disabled={currentFace === props.mainTotalFaces} onClick={() => { props.changeMainFace(props.mainTotalFaces) }}>►►</button>
      </div>
    </div>
  )
}

function App(props) {
  console.log('===================================================================')

  const [searching, setSearching] = useState(false);
  const [savedPkm, setSavedPkm] = useState([]);
  const [searchCardFace, setSearchCardFace] = useState(0);
  const [mainContainerFace, setMainContainerFace] = useState(0);
  const [maxPokemonShown, setMaxPokemonShown] = useState(10);
  const [mainTotalFaces, setMainTotalFaces] = useState(1);
  const [appFace, setAppFace] = useState(true);
  const [pkmCardFace, setPkmCardFace] = useState(0);
  const [changeAllCards, setChangeAllCards] = useState(false);
  const [inputs, setInputs] = useState([{
    name: 'pkm_index',
    value: 1,
  }, {
    name: 'quantity',
    value: 1,
  }, {
    name: 'pokedex_type',
    value: pokedex_arrays[0][0],
  }, {
    name: 'evolution_available',
    value: false,
  }, {
    name: 'forms_available',
    value: false,
  }, {
    name: 'types',
    value: []
  }]);

  let counter = 0;

  let pokedex_quantity = pokedex_arrays[pokedex_arrays.findIndex((item) => {
    return item[0] === inputs[2].value;
  })][2];

  function switchFormFace(value, indexToChange) {
    setSavedPkm(savedPkm.map((item) => {
      if (indexToChange === item.index) {
        item.forms_index = value;
      }
      return item;
    }))
  }

  function inputValueChange(name, value, event) {
    if (name === 'clear') {
      setSavedPkm([]);
      setMainTotalFaces(1)
      setMainContainerFace(0);
    } else if (name === 'maxPokemonShown') {
      if (value === 'All') {
        setMaxPokemonShown(value);
        setMainTotalFaces(1);
      } else {
        if ((savedPkm.length) > Number(value)) {
          let totalFaces;
          totalFaces = Math.floor((savedPkm.length) / Number(value));
          if (((savedPkm.length) % Number(value))) { totalFaces++ }
          setMainTotalFaces(totalFaces)

        } else {
          setMainTotalFaces(1)
        }
        setMaxPokemonShown(Number(value));

      }
      setMainContainerFace(0);
    } else if (name === 'pkmCardFace') {
      setChangeAllCards(true);
      setPkmCardFace(['Main', 'Stats', 'Evolutions', 'Forms'].findIndex((item) => { return item === value }));
    } else {
      setInputs(inputs.map((item) => {
        if (item.name === name) {
          if (typeof item.value === 'boolean') {
            item.value = !item.value;
            return item;
          } else if (name === 'types') {
            if (item.value.length === 3) {
              if (item.value.includes(value)) {
                item.value = item.value.filter((type) => type !== value);
                return item;
              }
              return item;
            } else {
              if (item.value.includes(value)) {
                item.value = item.value.filter((type) => type !== value);
                return item;
              }
              item.value.push(value)
              return item;
            }
          } else if (name === 'pkm_index' || name === 'quantity') {
            value = value === '' ? '' : Number(value);

            if (value === '') {
              item.value = '';
              return item;
            } else if (value <= 0) {
              item.value = 1;
              return item;
            } else if (name === 'pkm_index') {
              if (value > pokedex_quantity) {
                item.value = pokedex_quantity;
                return item;
              } else if ((value + inputs[1].value) > pokedex_quantity) {
                inputValueChange('quantity', pokedex_quantity - value);
                item.value = value;
                return item;
              }
            } else if (name === 'quantity') {
              if (value > pokedex_quantity) {
                item.value = pokedex_quantity - inputs[0].value + 1;
                return item;
              } else if ((inputs[0].value + value) > pokedex_quantity) {
                value = pokedex_quantity - inputs[0].value + 1;
                item.value = value;
                return item
              }
            }
          }
          item.value = value;
        }
        return item;
      }))
    }

  }

  function mousePress(event, increment, inputToChange, max) {
    event.preventDefault();
    let selectedInput = inputs[inputs.findIndex((item) => {
      if (item.name === inputToChange) { return item }
    })];

    if (increment) {
      inputValueChange(inputToChange, Number(selectedInput.value) + 1)
      if (selectedInput.value === max) { return }
    } else {
      if (selectedInput.value === 1) { return }
      inputValueChange(inputToChange, Number(selectedInput.value) - 1)
    }
    intervalID = setInterval(() => {
      if (increment) {
        if (selectedInput.value === max) { return }
        inputValueChange(inputToChange, Number(selectedInput.value) + 1)
      } else {
        if (selectedInput.value === 1) { return }
        inputValueChange(inputToChange, Number(selectedInput.value) - 1)
      }
    }, 50)
  }

  function mouseRelease(event) {
    event.preventDefault();
    clearInterval(intervalID);
  }

  function searchVersion(generation, versions, pkm_entry_version) {
    let version;

    switch (generation) {
      case ('generation-i'):
        version = versions[0][0];
        break;
      case ('generation-ii'):
        version = versions[1][0];
        break;
      case ('generation-iii'):
        version = versions[2][0];
        break;
      case ('generation-iv'):
        version = versions[3][0];
        break;
      case ('generation-v'):
        version = versions[4][0];
        break;
      case ('generation-vi'):
        version = versions[5][0];
        break;
      case ('generation-vii'):
        let index = versions[6].findIndex((item) => {
          return item === pkm_entry_version;
        })
        version = versions[6][index];
        break;
      case ('generation-viii'):
        version = versions[7][0];
        break;
      case ('generation-ix'):
        version = versions[8][0];
        break;
      default:
        version = 'red';
    }
    return version;
  }
  const generations_and_versions_relation = [
    ['red', 'blue'],
    ['gold', 'silver'],
    ['ruby', 'sapphire'],
    ['diamond', 'pear'],
    ['black', 'white'],
    ['x', 'y'],
    ['sun', 'moon', 'ultra-sun', 'ultra-moon', 'lets-go-pikachu'],
    ['sword', 'shield'],
    ['scarlet', 'violet']
  ];

  function searchParameters(pkm_index, quantity) {
    setSearching(true);
    if (pkm_index === '') { pkm_index = 1 }
    if (quantity === '') { quantity = 1 }
    let url = pokedex_arrays[pokedex_arrays.findIndex((item) => {
      return item[0] === inputs[2].value
    })][1];
    let counter = 0;
    let pokemonPromises = [];
    if (quantity > 0) {
      do {
        pokemonPromises.push(searchPokemon(url, Number(pkm_index) + counter));
        counter++;
      }
      while (counter < quantity)
      Promise.all(pokemonPromises).then((values) => {
        setSearching(false);
        const pokemon_array = [];
        values.forEach((item) => {
          if (typeof item === 'object') { pokemon_array.push(item) }
        })
        if (pokemon_array.length > 0) {
          let totalFaces = 1;
          if ((pokemon_array.length + savedPkm.length) > max && maxPokemonShown !== 'All') {
            totalFaces = Math.floor((pokemon_array.length + savedPkm.length) / max);
            if (((pokemon_array.length + savedPkm.length) % max)) { totalFaces++ }
          }
          setMainTotalFaces(totalFaces);
          setSavedPkm((prev) => [...prev, ...pokemon_array])
          setAppFace(true);
        } else { alert('No pokemon with desired parameters found') };
      });
    }
  }

  async function searchPokemon(url, value) {
    let response = await (await (fetch(url))).json().then(
      async (res) => {
        try {
          let pokemon_species = await (await fetch(res.pokemon_entries[value - 1].pokemon_species.url)).json();
          let pokemon_endpoint = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_species.id}/`)).json();
          let evolution_chain = await (await fetch(pokemon_species.evolution_chain.url)).json();

          if (inputs[3].value === true && evolution_chain.chain.evolves_to.length === 0) { return false };
          if (inputs[4].value === true && pokemon_endpoint.forms.length === 1) { return false }
          if (inputs[5].value.length > 0) {
            let is_of_desired_type;
            for (let input_type of inputs[5].value) {
              is_of_desired_type = pokemon_endpoint.types.findIndex((type_item) => {
                return type_item.type.name === input_type;
              })
              if (is_of_desired_type > -1) {
                break;
              }
            }
            if (is_of_desired_type === -1) { return false }
          }
          let pokemon_object = {};
          pokemon_object.forms_index = 0;
          pokemon_object.evolution_index = 0;
          pokemon_object.face = pkmCardFace;
          pokemon_object.name = pokemon_endpoint.name;
          pokemon_object.height = pokemon_endpoint.height;
          pokemon_object.weight = pokemon_endpoint.weight;
          pokemon_object.sprites = pokemon_endpoint.sprites;
          pokemon_object.types = pokemon_endpoint.types;
          pokemon_object.abilities = pokemon_endpoint.abilities;
          pokemon_object.stats = pokemon_endpoint.stats;
          pokemon_object.id = pokemon_species.id;
          pokemon_object.index = value;
          pokemon_object.color = pokemon_species.color.name;
          pokemon_object.genera = pokemon_species.genera;
          pokemon_object.generation = pokemon_species.generation.name;
          pokemon_object.shape = pokemon_species.shape;
          let flav_text_index = pokemon_species.flavor_text_entries.findIndex((item) => {
            return item.language.name === 'en' && item.version.name === searchVersion(pokemon_species.generation.name, generations_and_versions_relation, item.version.name)
          })
          pokemon_object.description = pokemon_species.flavor_text_entries[flav_text_index].flavor_text.replace('\f', '');
          if (pokemon_species.habitat) { pokemon_object.habitat = pokemon_species.habitat.name; }
          if (pokemon_endpoint.forms.length > 1) {
            pokemon_object.forms = [];
            pokemon_endpoint.forms.forEach(async (item) => {
              const resource = await (await fetch(item.url)).json();
              pokemon_object.forms.push({ name: resource.name, form_name: resource.form_name, img_src: resource.sprites.front_default })
            })
          }
          if (evolution_chain.chain.evolves_to.length > 0) {
            pokemon_object.evolution_chain = [];
            if (evolution_chain.chain.species === pokemon_endpoint.name) {
              pokemon_object.evoFrom = { name: pokemon_endpoint.name, evoSprite: pokemon_endpoint.sprites.front_default };
            } else {
              const evoFromSpecies = await (await fetch(evolution_chain.chain.species.url)).json();
              const evoFromPokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${evoFromSpecies.id}`)).json();
              pokemon_object.evoFrom = { name: evoFromPokemon.name, evoSprite: evoFromPokemon.sprites.front_default };
            }
            evolution_chain.chain.evolves_to.forEach(async (item) => {
              if (item.species.name === pokemon_endpoint.name) {
                if (item.evolves_to.length > 0) {
                  item.evolves_to.forEach(async (item2) => {
                    const species = await (await fetch(item2.species.url)).json();
                    const nextEvo = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${species.id}`)).json();
                    pokemon_object.evolution_chain.push({
                      evo: { evoName: pokemon_endpoint.name, evoSprite: pokemon_endpoint.sprites.front_default },
                      nextEvo: { evoName: nextEvo.name, evoSprite: nextEvo.sprites.front_default }
                    })
                  })
                } else {
                  pokemon_object.evolution_chain.push({
                    evo: { evoName: pokemon_endpoint.name, evoSprite: pokemon_endpoint.sprites.front_default },
                  })
                }
              } else {
                if (item.evolves_to.length > 0) {
                  item.evolves_to.forEach(async (item2) => {
                    if (item2.name === pokemon_endpoint.name) {
                      const species = await (await fetch(item.species.url)).json();
                      const evo = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${species.id}`)).json();
                      pokemon_object.evolution_chain.push({
                        evo: { evoName: evo.name, evoSprite: evo.sprites.front_default },
                        nextEvo: { evoName: pokemon_endpoint.name, evoSprite: pokemon_endpoint.sprites.front_default },
                      })
                    } else {
                      const evoSpecies = await (await fetch(item.species.url)).json();
                      const evo = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${evoSpecies.id}`)).json();
                      const nextEvoSpecies = await (await fetch(item2.species.url)).json();
                      const nextEvo = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${nextEvoSpecies.id}`)).json();
                      pokemon_object.evolution_chain.push({
                        evo: { evoName: evo.name, evoSprite: evo.sprites.front_default },
                        nextEvo: { evoName: nextEvo.name, evoSprite: nextEvo.sprites.front_default }
                      })
                    }
                  })
                } else {
                  const species = await (await fetch(item.species.url)).json();
                  const evo = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${species.id}`)).json();
                  pokemon_object.evolution_chain.push({
                    evo: { evoName: evo.name, evoSprite: evo.sprites.front_default },
                  })
                }
              }
            })
          }
          return pokemon_object;
        } catch (err) {
          console.log('ERROR:', err);
        }
      });
    return response;
  }
  function changeCardFace(face, cardToChange, erase) {
    if (cardToChange === 'search-card') {
      setSearchCardFace(face);
      return;
    }
    if (erase) {
      let totalFaces;
      totalFaces = Math.floor((savedPkm.length - 1) / max);
      if (((savedPkm.length - 1) % max)) { totalFaces++ }
      setMainTotalFaces(totalFaces);
      setSavedPkm(savedPkm.filter((item) => item.index !== cardToChange));
      if (counter === 1) {

        setMainContainerFace((mainContainerFace - 1) === - 1 ? 0 : mainContainerFace - 1)
      }
      return;
    }
    setChangeAllCards(false);
    setSavedPkm(savedPkm.map((item) => {
      if (cardToChange === item.index) {
        item.face = face;
      }
      return item;
    }))
  }

  function changeMainFace(value) {
    setMainContainerFace(value - 1);
  }

  useEffect(() => {
    searchPokemon(pokedex_arrays[pokedex_arrays.findIndex(
      (item) => {
        return item[0] === inputs[2].value;
      }
    )][1], 412).then((res) => setSavedPkm((prev) => {
      return [...prev, res]
    }));
  }, []
  );

  function listSearchSwitch(value) {
    if (value === appFace) { return }
    setAppFace(value);
  }

  function switchEvo(n, index) {

    let pkm_index = savedPkm[savedPkm.findIndex((element) => {
      return element.index === index;
    })];
    let num = pkm_index.evolution_index + n;
    switch (num) {
      case pkm_index.evolution_chain.length:
        setSavedPkm(savedPkm.map((item) => {
          if (index === item.index) {
            item.evolution_index = 0;
          }
          return item;
        }));
        break;
      case -1:
        setSavedPkm(savedPkm.map((item) => {
          if (index === item.index) {
            item.evolution_index = pkm_index.evolution_chain.length - 1;
          }
          return item;
        }));
        break;
      default:
        setSavedPkm(savedPkm.map((item) => {
          if (index === item.index) {
            item.evolution_index = num;
          }
          return item;
        }));
        break;
    }
  }

  let arr = [];
  let max = maxPokemonShown === 'All' ? savedPkm.length : maxPokemonShown;
  let index = (mainContainerFace) * max;

  if (savedPkm.length > 0) {
    for (let i = 0; i < max; i++) {
      let cardFace = pkmCardFace;
      if (savedPkm[index + i] === undefined) { counter = i; break }
      if (changeAllCards) {
        if (pkmCardFace === 2 && savedPkm[index + i].evolution_chain === undefined) {
          cardFace = 0;
        } else if (pkmCardFace === 3 && savedPkm[index + i].forms === undefined) {
          cardFace = 0;
        }
      } else {
        cardFace = savedPkm[index + i].face;
      }

      arr.push(<PkmCard
        index={savedPkm[index + i].index}
        name={savedPkm[index + i].name}
        pkmCurrentFace={cardFace}
        changeCardFace={changeCardFace}
        height={savedPkm[index + i].height}
        weight={savedPkm[index + i].weight}
        src={savedPkm[index + i].sprites.front_default}
        types={savedPkm[index + i].types}
        moves={savedPkm[index + i].abilities}
        description={savedPkm[index + i].description}
        stats={savedPkm[index + i].stats}
        habitat={savedPkm[index + i].habitat}
        genera={savedPkm[index + i].genera}
        shape={savedPkm[index + i].shape}
        evolution_chain={savedPkm[index + i].evolution_chain}
        evoFrom={savedPkm[index + i].evoFrom}
        carrousel_index={savedPkm[index + i].evolution_index}
        switchEvo={switchEvo}
        forms={savedPkm[index + i].forms}
        forms_index={savedPkm[index + i].forms_index}
        switchFormFace={switchFormFace}
        color={savedPkm[index + i].color === 'white' ? '#ccc' : savedPkm[index + i].color}
      />
      )
    }
  }



  if (savedPkm.length > 0) {
    if (appFace) {
      return (
        <div id='main-container'>
          <div className='main-container-buttons flex-row'>
            <button className='main-ctrl-btn' onClick={() => { listSearchSwitch(true) }}>List</button>
            <button className='main-ctrl-btn' onClick={() => { listSearchSwitch(false) }}>Search</button>
          </div>
          <MainCarrousel
            mainContainerFace={mainContainerFace}
            changeMainFace={changeMainFace}
            mainTotalFaces={mainTotalFaces}
            maxPokemonShown={maxPokemonShown}
          />
          <div id='pack'>
            {arr}
          </div>
        </div>

      );
    } else {
      return (
        <div id='main-container'>
          <div className='main-container-buttons flex-row'>
            <button className='main-ctrl-btn' onClick={() => { listSearchSwitch(true) }}>List</button>
            <button className='main-ctrl-btn' onClick={() => { listSearchSwitch(false) }}>Search</button>
          </div>
          <MainCarrousel
            mainContainerFace={mainContainerFace}
            changeMainFace={changeMainFace}
            mainTotalFaces={mainTotalFaces}
            maxPokemonShown={maxPokemonShown}
          />
          <div id='pack'>
            <PkmSelectionForm
              pokedex_type={inputs[2].value || pokedex_arrays[0][0]}
              inputValueChange={inputValueChange}
              searchParameters={searchParameters}
              pkm_search_index={inputs[0].value}
              quantity={inputs[1].value}
              evoCheck={inputs[3].value}
              formsCheck={inputs[4].value}
              types={inputs[5].value}
              searchCardFace={searchCardFace}
              changeCardFace={changeCardFace}
              mousePress={mousePress}
              mouseRelease={mouseRelease}
              searching={searching}
            />
          </div>
        </div>

      )
    }

  } else {
    return (
    <div id='main-container'>
      <div className='main-container-buttons flex-row'>
        <button className='main-ctrl-btn' onClick={() => { listSearchSwitch(true) }}>List</button>
        <button className='main-ctrl-btn' onClick={() => { listSearchSwitch(false) }}>Search</button>
        </div>
      <MainCarrousel
        mainContainerFace={mainContainerFace}
        changeMainFace={changeMainFace}
        mainTotalFaces={mainTotalFaces}
        maxPokemonShown={maxPokemonShown}
      />
      <div id='pack'>
        <PkmSelectionForm
          pokedex_type={inputs[2].value || pokedex_arrays[0][0]}
          inputValueChange={inputValueChange}
          searchParameters={searchParameters}
          pkm_search_index={inputs[0].value}
          quantity={inputs[1].value}
          evoCheck={inputs[3].value}
          formsCheck={inputs[4].value}
          types={inputs[5].value}
          searchCardFace={searchCardFace}
          changeCardFace={changeCardFace}
          mousePress={mousePress}
          mouseRelease={mouseRelease}
          searching={searching}
        />
      </div>
    </div>
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
