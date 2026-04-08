"use client"

import { useEffect, useRef } from "react"

type Point3D = {
  x: number
  y: number
  z: number
}

const findBounds = (points: Point3D[]) => {
  const initialBounds = [0, 100000000]
  return points.reduce(
    (bounds, point) => {
      const x = [
        bounds.x[0] < point.x ? point.x : bounds.x[0],
        bounds.x[1] > point.x ? point.x : bounds.x[1],
      ]
      const y = [
        bounds.y[0] < point.y ? point.y : bounds.y[0],
        bounds.y[1] > point.y ? point.y : bounds.y[1],
      ]
      const z = [
        bounds.z[0] < point.z ? point.z : bounds.z[0],
        bounds.z[1] > point.z ? point.z : bounds.z[1],
      ]

      return { x, y, z }
    },
    {
      x: initialBounds,
      y: initialBounds,
      z: initialBounds,
    },
  )
}

const Visualizer = ({ data }: { data: Point3D[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<Point3D[]>(data)
  const scaleRef = useRef<number>(1)
  const centerRef = useRef<Point3D>({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    dataRef.current = data

    if (data.length === 0) return

    const bounds = findBounds(data)
    const center = {
      x: bounds.x[0] + (bounds.x[1] - bounds.x[0]) / 2,
      y: bounds.y[0] + (bounds.y[1] - bounds.y[0]) / 2,
      z: bounds.z[0] + (bounds.z[1] - bounds.z[0]) / 2,
    }

    scaleRef.current = 200 / Math.max(center.x, center.y, center.z)
    centerRef.current = center
  }, [data])

  useEffect(() => {
    if (!containerRef.current) return

    let instance: any

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (p: any) => {
        let rotating = true
        let yaw = 0
        let pitch = -0.3
        let radius = 500

        let minSize = 1000
        let isHoveringCanvas = false
        let canvas: any

        p.windowResized = () => {
          const { offsetWidth, offsetHeight } = containerRef.current!
          minSize = Math.min(offsetWidth, offsetHeight)
          p.resizeCanvas(offsetWidth, offsetHeight)
        }

        p.setup = () => {
          const { offsetWidth, offsetHeight } = containerRef.current!
          minSize = Math.min(offsetWidth, offsetHeight)

          canvas = p.createCanvas(offsetWidth, offsetHeight, p.WEBGL)

          canvas.mouseOver(() => {
            isHoveringCanvas = true
          })

          canvas.mouseOut(() => {
            isHoveringCanvas = false
          })
        }

        p.mouseDragged = () => {
          if (!isHoveringCanvas) return

          rotating = false

          yaw += p.movedX * 0.01
          pitch += p.movedY * 0.01

          const limit = Math.PI / 2 - 0.1
          pitch = Math.max(-limit, Math.min(limit, pitch))

          return false
        }

        p.mouseWheel = (event: WheelEvent) => {
          if (!isHoveringCanvas) return

          radius -= event.deltaY * 0.5
          radius = Math.max(50, Math.min(3000, radius))

          return false
        }

        p.draw = () => {
          p.background(15)

          if (rotating) {
            yaw += 0.01
          }

          const scale = scaleRef.current * (minSize / 500)
          const center = centerRef.current

          const camX = Math.cos(pitch) * Math.sin(yaw) * radius
          const camY = Math.sin(pitch) * radius
          const camZ = Math.cos(pitch) * Math.cos(yaw) * radius

          p.camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0)

          p.ambientLight(150)
          p.pointLight(255, 255, 255, 0, 0, 300)

          p.noStroke()
          p.fill(255, 0, 0)

          for (const point of dataRef.current) {
            p.push()
            p.translate(
              (point.x - center.x) * scale,
              (point.y - center.y) * scale,
              (point.z - center.z) * scale,
            )
            p.sphere(scale * 400)
            p.pop()
          }
        }
      }

      instance = new p5(sketch, containerRef.current!)
    }

    loadP5()

    return () => {
      if (instance) instance.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex-1 min-h-0 overflow-hidden"
    />
  )
}

export default Visualizer
