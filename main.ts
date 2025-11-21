input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Ampelsteuerung()
})
function Ampelsteuerung () {
    basic.pause(500)
    Ampel2(1, 0)
    Ampel3(0, 0, 1)
    basic.pause(1000)
    Ampel3(0, 1, 0)
    basic.pause(2000)
    Ampel3(1, 0, 0)
    basic.pause(2000)
    Ampel2(0, 1)
    basic.pause(7000)
    Ampel2(1, 0)
    basic.pause(5000)
    Ampel3(1, 1, 0)
    basic.pause(750)
    Ampel3(0, 0, 1)
}
function Ampel3 (ro: number, ge: number, gr: number) {
    pins.comment(pins.pins_text("Auto Pin0=rot Pin1=gelb Pin2=grün"))
    pins.gpio_writeBit(pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27), pins.pins_gpio_pin(pins.gpio_epin.Pin0), ro == 1)
    pins.gpio_writeBit(pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27), pins.pins_gpio_pin(pins.gpio_epin.Pin1), ge == 1)
    pins.gpio_writeBit(pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27), pins.pins_gpio_pin(pins.gpio_epin.Pin2), gr == 1)
}
function Ampel2 (ro: number, gr: number) {
    pins.comment(pins.pins_text("Fußgänger Pin4=rot Pin5=grün"))
    pins.gpio_writeBit(pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27), pins.pins_gpio_pin(pins.gpio_epin.Pin4), ro == 1)
    pins.gpio_writeBit(pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27), pins.pins_gpio_pin(pins.gpio_epin.Pin5), gr == 1)
}
function i2cgpioampel541 () {
    pins.comment(pins.pins_text("calliope-net/i2c-gpio-ampel5-41"))
}
pins.gpio_setMode(
pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27),
pins.gpio_eIO.IN_inverted,
pins.gpio_eIO.IN_inverted,
pins.gpio_eIO.OUT,
pins.gpio_eIO.OUT,
pins.gpio_eIO.OUT,
pins.gpio_eIO.OUT,
pins.gpio_eIO.OUT,
pins.gpio_eIO.OUT
)
loops.everyInterval(1000, function () {
    pins.comment(pins.pins_text("Pin6=Taste an der Ampel"))
    if (pins.gpio_readBit(pins.pins_gpio_I2C_ADDRESS(pins.gpio_eI2C_ADDRESS.GPIO_x27), pins.pins_gpio_pin(pins.gpio_epin.Pin6))) {
        Ampelsteuerung()
    }
})
