import { Card, CardBody, CardHeader } from "@heroui/react"

const decodeCoordinateString = (coordinateString: string) => {
  const length = coordinateString.length
  const n = length / 3

  const coordinates = coordinateString
    .match(/.{1,4}/g)
    ?.filter((obj) => !!obj && !obj.match("0000"))
    .map((hex, index, arr) => {
      const m = arr.length / 3
      return {
        x: (index % m) * 1000,
        y: Number("0x" + hex) * 10,
        z: Math.floor(index / m) * 2000,
      }
    })

  return coordinates || []
}

const CoordinatesCard = ({
  dataString,
  setCoordinates,
  index,
}: {
  dataString: string
  setCoordinates: (coords: { x: number; y: number; z: number }[]) => void
  index: number
}) => {
  const coordinates = decodeCoordinateString(dataString)

  return (
    <Card
      key={index}
      isPressable
      onPress={() => {
        console.log(coordinates)
        setCoordinates(coordinates)
      }}
    >
      <CardHeader>{"Reading #" + (index + 1)}</CardHeader>
      <CardBody>{"Number of coordinates: " + coordinates.length}</CardBody>
    </Card>
  )
}

export default CoordinatesCard
