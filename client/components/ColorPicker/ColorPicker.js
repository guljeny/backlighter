import React from 'react'
import classnames from 'classnames'
import colorsys from 'colorsys'
import SelectWheel from './SelectWheel'
import SelectedColor from './SelectedColor'
import PathToColor from './PathToColor'

import './colorPicker.scss'

export default class ColorPicker extends React.PureComponent {
  state = {
    colors: this.props.colors.map(([r, g], id) => ({
      angle: r || 0,
      saturation: g || 0,
      id,
    })),
    selectedColor: 0,
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps (props) {
    this.setState({
      colors: props.colors.map(([r, g], id) => ({
        angle: r || 0,
        saturation: g || 0,
        id,
      })),
    })
  }

  handleChange = () => {
    const { colors } = this.state
    this.props.onChange(colors.map(({ angle, saturation }) => [angle, saturation]))
  }

  selectColor = selectedColor => this.setState({ selectedColor })

  setColor = angle => {
    this.setState(({ colors, selectedColor }) => ({
      colors: colors.map((color, index) => {
        if (index === selectedColor) return { ...color, angle }
        return color
      }),
    }), this.handleChange)
  }

  setSaturation = saturation => {
    this.setState(({ colors, selectedColor }) => ({
      colors: colors.map((color, index) => {
        if (index === selectedColor) return { ...color, saturation }
        return color
      }),
    }), this.handleChange)
  }

  addColor = () => {
    this.setState(({ colors }) => ({
      colors: [...colors, { angle: 0, saturation: 100, id: Date.now() }],
      selectedColor: colors.length,
    }), this.handleChange)
  }

  removeColor = id => {
    this.setState(({ colors, selectedColor }) => ({
      colors: colors.filter(color => color.id !== id),
      selectedColor: selectedColor > 0 ? selectedColor - 1 : selectedColor,
    }), this.handleChange)
  }

  render () {
    const { colors, selectedColor } = this.state
    const { powerEnabled, togglePower, disabled } = this.props
    return (
      <div className={classnames('color-picker', disabled && 'color-picker--disabled')}>
        <SelectWheel
          setColor={this.setColor}
          setSaturation={this.setSaturation}
          angle={colors[selectedColor].angle}
          saturation={colors[selectedColor].saturation}
          powerEnabled={powerEnabled}
          togglePower={togglePower}
        />
        <div className="color-picker__colors-container">
          <PathToColor count={colors.length} selectedColor={selectedColor} />
          <div className="color-picker__colors">
            {colors.map(({ id, angle, saturation }, i) => (
              <SelectedColor
                key={id}
                onSelect={() => this.selectColor(i)}
                onRemove={() => this.removeColor(id)}
                color={colorsys.hsvToRgb(angle, saturation, 100)}
                isActive={i === selectedColor}
                showTrash={colors.length > 1}
              />
            ))}
            {colors.length < 5 && (
              <div className="color-picker__add-color" onClick={this.addColor}>
                +
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ColorPicker.defaultProps = {
  colors: [],
  onChange: () => {},
}
