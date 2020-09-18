import React from 'react'
import colorsys from 'colorsys'
import SelectWheel from './SelectWheel'
import SelectedColor from './SelectedColor'
import PathToColor from './PathToColor'

import './colorPicker.scss'

export default class ColorPicker extends React.PureComponent {
  state = {
    colors: this.props.colors.map(([r, g, b], id) => ({
      angle: colorsys.rgbToHsv({ r, g, b }).h,
      id,
    })),
    selectedColor: 0,
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps (props) {
    this.setState({
      colors: props.colors.map(([r, g, b], id) => ({
        angle: colorsys.rgbToHsv({ r, g, b }).h,
        id,
      })),
    })
  }

  handleChange = () => {
    const { colors } = this.state
    this.props.onChange(colors.map(({ angle }) => {
      const { r, g, b } = colorsys.hsvToRgb(angle, 100, 100)
      return [r, g, b]
    }))
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

  addColor = () => {
    this.setState(({ colors }) => ({
      colors: [...colors, { angle: 0, id: Date.now() }],
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
    return (
      <div className="color-picker">
        <SelectWheel
          setColor={this.setColor}
          // colors={colors}
          angle={colors[selectedColor].angle}
          // selectedColor={selectedColor}
        />
        <div className="color-picker__colors-container">
          <PathToColor count={colors.length} selectedColor={selectedColor} />
          <div className="color-picker__colors">
            {colors.map((color, i) => (
              <SelectedColor
                key={color.id}
                onSelect={() => this.selectColor(i)}
                onRemove={() => this.removeColor(color.id)}
                color={color.angle}
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
