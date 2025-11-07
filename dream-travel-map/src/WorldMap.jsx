import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

function WorldMap({ visitedCountries, onCountryClick, isDarkMode }) {
	const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [center, setCenter] = useState([0, 20])

	const isVisited = countryName => {
		return visitedCountries.some(country => country.toLowerCase() === countryName.toLowerCase())
	}

	const handleMouseEnter = (geo, event) => {
		const countryName = geo.properties.name
		setTooltip({
			visible: true,
			name: countryName,
			x: event.clientX,
			y: event.clientY,
		})
	}

	const handleMouseMove = event => {
		if (tooltip.visible) {
			setTooltip(prev => ({
				...prev,
				x: event.clientX,
				y: event.clientY,
			}))
		}
	}

	const handleMouseLeave = () => {
		setTooltip({ visible: false, name: '', x: 0, y: 0 })
	}

	const handleZoomIn = () => {
		if (zoom < 8) setZoom(zoom * 1.5)
	}

	const handleZoomOut = () => {
		if (zoom > 1) setZoom(zoom / 1.5)
	}

	const handleReset = () => {
		setZoom(1)
		setCenter([0, 20])
	}

	const handleMoveEnd = position => {
		setCenter(position.coordinates)
		setZoom(position.zoom)
	}

	return (
		<div
			className={`w-full h-full flex items-center justify-center ${
				isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
			} p-8 relative`}
			onMouseMove={handleMouseMove}>
			<div className='w-full max-w-6xl relative'>
				<ComposableMap
					projection='geoMercator'
					projectionConfig={{
						scale: 147,
					}}
					style={{
						width: '100%',
						height: 'auto',
					}}>
					<ZoomableGroup zoom={zoom} center={center} onMoveEnd={handleMoveEnd} minZoom={1} maxZoom={8}>
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map(geo => {
									const countryName = geo.properties.name
									const visited = isVisited(countryName)

									return (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											onMouseEnter={event => handleMouseEnter(geo, event)}
											onMouseLeave={handleMouseLeave}
											onClick={() => {
												onCountryClick(countryName)
												handleMouseLeave()
											}}
											style={{
												default: {
													fill: visited ? '#0ea5e9' : '#e2e8f0',
													stroke: '#ffffff',
													strokeWidth: 0.75,
													outline: 'none',
												},
												hover: {
													fill: visited ? '#0284c7' : '#f97316',
													stroke: '#ffffff',
													strokeWidth: 1,
													outline: 'none',
													cursor: 'pointer',
												},
												pressed: {
													fill: '#0e7490',
													stroke: '#ffffff',
													strokeWidth: 1,
													outline: 'none',
												},
											}}
										/>
									)
								})
							}
						</Geographies>
					</ZoomableGroup>
				</ComposableMap>

				{/* Zoom Controls */}
				<div className='absolute bottom-8 right-8 flex flex-col gap-2'>
					<button
						onClick={handleZoomIn}
						className='bg-white hover:bg-gray-100 text-gray-700 font-bold w-12 h-12 rounded-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center text-2xl'
						title='Zoom In'>
						+
					</button>
					<button
						onClick={handleZoomOut}
						className='bg-white hover:bg-gray-100 text-gray-700 font-bold w-12 h-12 rounded-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center text-2xl'
						title='Zoom Out'>
						−
					</button>
					<button
						onClick={handleReset}
						className='bg-white hover:bg-gray-100 text-gray-700 font-semibold w-12 h-12 rounded-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center text-xs'
						title='Reset View'>
						⟲
					</button>
				</div>

				{/* Legend */}
				<div className='absolute bottom-8 left-8 bg-white rounded-lg shadow-lg p-4'>
					<h3 className='font-bold text-gray-800 mb-2 text-sm'>Legend</h3>
					<div className='flex items-center gap-2 mb-2'>
						<div className='w-4 h-4 bg-cyan-500 rounded'></div>
						<span className='text-xs text-gray-700'>Visited</span>
					</div>
					<div className='flex items-center gap-2 mb-2'>
						<div className='w-4 h-4 bg-gray-300 rounded'></div>
						<span className='text-xs text-gray-700'>Not visited</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-4 h-4 bg-orange-500 rounded'></div>
						<span className='text-xs text-gray-700'>Hover</span>
					</div>
				</div>

				{/* Tooltip */}
				{tooltip.visible && (
					<div
						className='fixed pointer-events-none z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-semibold'
						style={{
							left: `${tooltip.x + 15}px`,
							top: `${tooltip.y + 15}px`,
							transform: 'translate(0, -50%)',
						}}>
						{tooltip.name}
						<div className='absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45'></div>
					</div>
				)}
			</div>
		</div>
	)
}

export default WorldMap
