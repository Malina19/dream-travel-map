import { useState, useEffect } from 'react'
import { getUniqueContinents, isValidCountry } from './countryData'
import WorldMap from './WorldMap'
import { getCountryFlag } from './countryFlags.jsx'

function App() {
	const [visitedCountries, setVisitedCountries] = useState(() => {
		const saved = localStorage.getItem('visitedCountries')
		if (saved) {
			const parsed = JSON.parse(saved)

			if (parsed.length > 0 && typeof parsed[0] === 'string') {
				return parsed.map(countryName => ({
					name: countryName,
					cities: [],
				}))
			}
			return parsed
		}
		return []
	})

	const [newCountry, setNewCountry] = useState('')
	const [error, setError] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem('darkMode')
		return saved === 'true'
	})

	// 🆕 NOWY: Stan dla wishlist
	const [wishlist, setWishlist] = useState(() => {
		const saved = localStorage.getItem('wishlist')
		if (saved) {
			return JSON.parse(saved)
		}
		return ['Japan', 'Iceland']
	})

	// 🆕 NOWY: Stan dla nowego kraju na wishlist
	const [newWishlistCountry, setNewWishlistCountry] = useState('')
	const [addingCityTo, setAddingCityTo] = useState(null)
	const [newCityName, setNewCityName] = useState('')
	const [newCityDate, setNewCityDate] = useState('')
	const [expandedCountries, setExpandedCountries] = useState(() => {
		const initial = {}
		visitedCountries.forEach(country => {
			initial[country.name] = true
		})
		return initial
	})

	// Zapisz visited countries do localStorage
	useEffect(() => {
		localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries))
	}, [visitedCountries])

	// 🆕 NOWY: Zapisz wishlist do localStorage
	useEffect(() => {
		localStorage.setItem('wishlist', JSON.stringify(wishlist))
	}, [wishlist])

	// 🆕 NOWY: Zapisz tryb ciemny do localStorage

	useEffect(() => {
		localStorage.setItem('darkMode', isDarkMode.toString())
	}, [isDarkMode])

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDarkMode])

	// 🆕 NOWE: Obliczanie statystyk
	const totalCountries = 195 // Liczba krajów na świecie
	const visitedCount = visitedCountries.length
	const worldPercentage = ((visitedCount / totalCountries) * 100).toFixed(1)
	const continentsVisited = getUniqueContinents(visitedCountries.map(c => c.name)).length
	const totalCities = visitedCountries.reduce((sum, country) => {
		return sum + country.cities.length
	}, 0)

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
	}

	const handleAddCountry = (countryFromMap = null) => {
		// Jeśli kraj pochodzi z mapy - użyj go, jeśli nie - weź z inputa
		const countryName = countryFromMap ? countryFromMap.trim() : newCountry.trim()

		// Walidacja 1: Puste pole (tylko dla formularza)
		if (!countryFromMap && countryName === '') {
			setError('Please enter a country name!')
			return
		}

		// Formatowanie nazwy
		const formattedCountryName = countryName
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')

		// 🆕 NOWA Walidacja: Czy kraj istnieje?
		if (!isValidCountry(formattedCountryName)) {
			if (!countryFromMap) {
				setError(`"${formattedCountryName}" is not a valid country name!`)
			}
			return
		}

		// Walidacja 2: Duplikat
		const isDuplicate = visitedCountries.some(
			country => country.name.toLowerCase() === formattedCountryName.toLowerCase()
		)

		if (isDuplicate) {
			if (!countryFromMap) {
				setError('This country is already on your list!')
			}
			return
		}

		// ✅ Wszystko OK - dodaj kraj
		setVisitedCountries([...visitedCountries, { name: formattedCountryName, cities: [] }])

		// Wyczyść input tylko gdy dodajemy z formularza
		if (!countryFromMap) {
			setNewCountry('')
			setError('')
		}

		// Usuń z wishlist jeśli był tam
		setWishlist(wishlist.filter(country => country.toLowerCase() !== formattedCountryName.toLowerCase()))
	}

	const handleRemoveCountry = countryToRemove => {
		setVisitedCountries(visitedCountries.filter(country => country.name !== countryToRemove))
	}

	// 🆕 NOWA FUNKCJA: Dodawanie do wishlist
	const handleAddToWishlist = () => {
		const countryName = newWishlistCountry.trim()

		if (countryName === '') return

		const formattedCountryName = countryName
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')

		// Sprawdź czy już nie jest na wishlist lub visited
		const isOnWishlist = wishlist.some(country => country.toLowerCase() === formattedCountryName.toLowerCase())
		const isVisited = visitedCountries.some(
			country => country.name.toLowerCase() === formattedCountryName.toLowerCase()
		)

		if (!isOnWishlist && !isVisited) {
			setWishlist([...wishlist, formattedCountryName])
		}

		setNewWishlistCountry('')
	}

	// 🆕 NOWA FUNKCJA: Usuwanie z wishlist
	const handleRemoveFromWishlist = countryToRemove => {
		setWishlist(wishlist.filter(country => country !== countryToRemove))
	}

	// Funckja do dodawania miasta do kraju/////

	const handleAddCity = countryName => {
		const cityName = newCityName.trim()
		const visitDate = newCityDate

		if (cityName === '' || visitDate === '') {
			return
		}

		const updatedCountries = visitedCountries.map(country => {
			if (country.name === countryName) {
				const cityExists = country.cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())

				if (cityExists) {
					return country
				}

				return {
					...country,
					cities: [...country.cities, { name: cityName, visitDate }],
				}
			}
			return country
		})
		setTimeout(() => {
			setVisitedCountries(updatedCountries)
			setNewCityName('')
			setNewCityDate('')
			setAddingCityTo(null)
		}, 150)
	}

	// Usuwanie miasta z kraju///
	const handleRemoveCity = (countryName, cityName) => {
		const updatedCountries = visitedCountries.map(country => {
			if (countryName === countryName) {
				return {
					...country,
					cities: country.cities.filter(city => city.name !== cityName),
				}
			}
			return country
		})
		setVisitedCountries(updatedCountries)
	}

	// Funkcja rozwijania/zwijania miast///
	const toggleCountryExpanded = countryName => {
		setExpandedCountries(prev => ({
			...prev,
			[countryName]: !prev[countryName],
		}))
	}

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			handleAddCountry()
		}
	}

	// 🆕 NOWY: Key press dla wishlist
	const handleWishlistKeyPress = e => {
		if (e.key === 'Enter') {
			handleAddToWishlist()
		}
	}

	const handleInputChange = e => {
		setNewCountry(e.target.value)
		if (error) {
			setError('')
		}
	}

	const filteredCountries = visitedCountries.filter(country =>
		country.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
			{/* PANEL BOCZNY */}
			<div className={`w-96 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-xl p-6 overflow-y-auto`}>
				<div className='mb-6'>
					<button
						onClick={toggleDarkMode}
						className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all font-semibold ${
							isDarkMode
								? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
								: 'bg-gray-800 hover:bg-gray-900 text-white'
						}`}>
						<span className='text-2xl'>{isDarkMode ? '☀️' : '🌙'}</span>
						<span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
					</button>
				</div>
				<div className='mb-6'>
					<h1 className='text-3xl font-bold text-blue-600'>Dream Travel Map</h1>
					<p className='text-gray-500 text-sm mt-2'>Track your adventures</p>
				</div>

				{/* 🆕 ZMODYFIKOWANE: Karty statystyk - teraz 3 karty */}
				<div className='space-y-3 mb-6'>
					{/* Karta 1: Visited Countries */}
					<div className='bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl p-4 text-white'>
						<div className='flex items-center justify-between mb-2'>
							<div className='text-xs font-medium opacity-90'>Visited Countries</div>
							<div className='text-2xl'>✓</div>
						</div>
						<div className='text-3xl font-bold mb-1'>{visitedCount}</div>
						<div className='text-xs opacity-75'>out of {totalCountries}</div>
					</div>

					{/* 🆕 NOWA Karta 2: Kontynenty */}
					<div className='bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white'>
						<div className='flex items-center justify-between mb-2'>
							<div className='text-xs font-medium opacity-90'>Continents</div>
							<div className='text-2xl'>🌍</div>
						</div>
						<div className='text-3xl font-bold mb-1'>{continentsVisited}</div>
						<div className='text-xs opacity-75'>out of 7</div>
					</div>

					{/* 🆕 NOWA Karta: Total Cities */}
					<div className='bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4 text-white'>
						<div className='flex items-center justify-between mb-2'>
							<div className='text-xs font-medium opacity-90'>Cities Visited</div>
							<div className='text-2xl'>🏙️</div>
						</div>
						<div className='text-3xl font-bold mb-1'>{totalCities}</div>
						<div className='text-xs opacity-75'>across {visitedCount} countries</div>
					</div>

					{/* 🆕 NOWA Karta 3: Wishlist */}
					<div className='bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-4 text-white'>
						<div className='flex items-center justify-between mb-2'>
							<div className='text-xs font-medium opacity-90'>Wishlist</div>
							<div className='text-2xl'>⭐</div>
						</div>
						<div className='text-3xl font-bold mb-1'>{wishlist.length}</div>
						<div className='text-xs opacity-75'>dream destinations</div>
					</div>
				</div>

				{/* 🆕 NOWY: Pasek progresu */}
				<div className='mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-sm font-semibold text-gray-700'>World Explored</span>
						<span className='text-sm font-bold text-cyan-600'>{worldPercentage}%</span>
					</div>
					<div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
						<div
							className='bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500'
							style={{ width: `${worldPercentage}%` }}></div>
					</div>
					<div className='mt-2 text-xs text-gray-500 text-center'>
						{visitedCount} / {totalCountries} countries
					</div>
				</div>

				{/* Formularz dodawania kraju */}
				<div className='mb-6'>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>Add Visited Country</label>
					<div className='flex gap-2'>
						<input
							type='text'
							value={newCountry}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
							placeholder='e.g. France'
							className={`
                flex-1 px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 
                transition-all
                ${
									error
										? 'border-red-500 focus:ring-red-400 focus:border-red-500'
										: 'border-gray-300 focus:ring-cyan-400 focus:border-transparent'
								}
              `}
						/>
						<button
							onClick={() => handleAddCountry()}
							className='bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors'>
							➕
						</button>
					</div>

					{error && (
						<div className='mt-2 flex items-center gap-2 text-red-500 text-sm'>
							<span>⚠️</span>
							<span>{error}</span>
						</div>
					)}
				</div>

				{/* Wyszukiwarka */}
				{visitedCountries.length > 0 && (
					<div className='mb-4'>
						<div className='relative'>
							<input
								type='text'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								placeholder='Search countries...'
								className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent'
							/>
							<div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>🔍</div>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery('')}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
									✕
								</button>
							)}
						</div>
					</div>
				)}

				{/* Lista krajów */}
				<div className='mb-6'>
					<h3 className='font-semibold text-gray-800 mb-3'>
						Visited Countries
						{searchQuery ? (
							<span className='text-cyan-600'>
								{' '}
								({filteredCountries.length} of {visitedCountries.length})
							</span>
						) : (
							<span> ({visitedCountries.length})</span>
						)}
					</h3>

					{visitedCountries.length === 0 ? (
						<div className='text-center py-8 text-gray-400'>
							<p className='text-4xl mb-2'>✈️</p>
							<p className='text-sm'>No countries yet!</p>
							<p className='text-xs'>Add your first destination above</p>
						</div>
					) : filteredCountries.length === 0 ? (
						<div className='text-center py-8 text-gray-400'>
							<p className='text-4xl mb-2'>🔍</p>
							<p className='text-sm'>No countries found</p>
							<p className='text-xs'>Try a different search term</p>
						</div>
					) : (
						<div className='space-y-2'>
							{filteredCountries.map(country => (
								<div
									key={country.name}
									className={`border rounded-lg p-3 transition-all ${
										isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
									}`}>
									{/* Nagłówek kraju + przycisk usuń */}
									<div className='flex items-center justify-between mb-2'>
										<div className='flex items-center gap-2'>
											{/* Przycisk rozwijania (tylko jeśli są miasta) */}
											{country.cities.length > 0 && (
												<button
													onClick={() => toggleCountryExpanded(country.name)}
													className='text-gray-500 hover:text-gray-700 transition-colors'>
													{expandedCountries[country.name] ? '🔽' : '▶️'}
												</button>
											)}

											<span className='text-lg font-semibold flex items-center gap-2'>
												{/* Flaga */}
												{getCountryFlag(country.name)}

												{/* Nazwa kraju z highlightem */}
												<span>
													{searchQuery ? (
														<>
															{country.name.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, index) =>
																part.toLowerCase() === searchQuery.toLowerCase() ? (
																	<span key={index} className='bg-yellow-200'>
																		{part}
																	</span>
																) : (
																	<span key={index}>{part}</span>
																)
															)}
														</>
													) : (
														country.name
													)}
												</span>
											</span>

											{/* Licznik miast */}
											{country.cities.length > 0 && (
												<span className='text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full'>
													{country.cities.length} {country.cities.length === 1 ? 'city' : 'cities'}
												</span>
											)}
										</div>

										<button
											onClick={() => handleRemoveCountry(country.name)}
											className={`transition-colors ${
												isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
											}`}
											title='Remove country'>
											❌
										</button>
									</div>

									{/* Lista miast */}
									{country.cities.length > 0 && expandedCountries[country.name] && (
										<div className='mb-2 space-y-1'>
											{country.cities
												.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
												.map(city => (
													<div
														key={city.name}
														className={`flex items-center justify-between text-sm py-1 px-2 rounded group/city ${
															isDarkMode ? 'bg-gray-600' : 'bg-gray-50'
														}`}>
														<div className='flex items-center gap-2'>
															<span className='text-xs'>📍</span>
															<span>{city.name}</span>
															<span className='text-xs text-gray-500'>
																({new Date(city.visitDate).toLocaleDateString('en-GB')})
															</span>
														</div>
														<button
															onClick={() => handleRemoveCity(country.name, city.name)}
															className='text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover/city:opacity-100 transition-opacity'
															title='Remove city'>
															✕
														</button>
													</div>
												))}
										</div>
									)}

									{/* Przycisk Add City */}
									{addingCityTo === country.name ? (
										// Formularz dodawania miasta
										<div className={`p-3 rounded-lg space-y-2 ${isDarkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
											<input
												type='text'
												value={newCityName}
												onChange={e => setNewCityName(e.target.value)}
												onKeyPress={e => {
													if (e.key === 'Enter' && newCityName && newCityDate) {
														handleAddCity(addingCityTo)
													}
												}}
												placeholder='City name (e.g. Paris)'
												autoFocus
												className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400'
											/>
											<input
												type='date'
												value={newCityDate}
												onChange={e => setNewCityDate(e.target.value)}
												max={new Date().toISOString().split('T')[0]}
												title='When did you visit this city?'
												className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400'
											/>
											<div className='flex gap-2'>
												<button
													onClick={() => handleAddCity(addingCityTo)}
													disabled={!newCityName || !newCityDate}
													className={`flex-1 text-white text-sm font-semibold py-2 rounded-lg transition-colors ${
														!newCityName || !newCityDate
															? 'bg-gray-400 cursor-not-allowed'
															: 'bg-cyan-500 hover:bg-cyan-600'
													}`}>
													✓ Add City
												</button>
												<button
													onClick={() => {
														setAddingCityTo(null)
														setNewCityName('')
														setNewCityDate('')
													}}
													className='px-4 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-semibold py-2 rounded-lg transition-colors'>
													Cancel
												</button>
											</div>
										</div>
									) : (
										// Przycisk do otwarcia formularza
										<button
											onClick={() => setAddingCityTo(country.name)}
											className='w-full text-xs text-cyan-600 hover:text-cyan-700 font-semibold py-2 border border-dashed border-cyan-300 hover:border-cyan-400 rounded-lg transition-colors'>
											+ Add City to {country.name}
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</div>

				{/* 🆕 NOWA SEKCJA: Wishlist */}
				<div className='border-t pt-6'>
					<h3 className='font-semibold text-gray-800 mb-3 flex items-center gap-2'>
						<span>⭐</span>
						<span>Wishlist ({wishlist.length})</span>
					</h3>

					{/* Input do dodawania na wishlist */}
					<div className='flex gap-2 mb-3'>
						<input
							type='text'
							value={newWishlistCountry}
							onChange={e => setNewWishlistCountry(e.target.value)}
							onKeyPress={handleWishlistKeyPress}
							placeholder='Dream destination...'
							className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent'
						/>
						<button
							onClick={() => handleAddToWishlist()}
							className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm'>
							➕
						</button>
					</div>

					{/* Lista wishlist */}
					{wishlist.length === 0 ? (
						<div className='text-center py-6 text-gray-400'>
							<p className='text-3xl mb-1'>💭</p>
							<p className='text-xs'>No dream destinations yet!</p>
						</div>
					) : (
						<div className='space-y-2'>
							{wishlist.map(country => (
								<div
									key={country}
									className='bg-orange-50 border border-orange-200 rounded-lg p-2 flex items-center justify-between group hover:border-orange-400 transition-all'>
									<span className='text-gray-700 text-sm'>{country}</span>
									<button
										onClick={() => handleRemoveFromWishlist(country)}
										className='text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-sm'
										title='Remove from wishlist'>
										✕
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* OBSZAR MAPY */}
			<div
				className={`flex-1 relative overflow-hidden ${
					isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
				}`}>
				{/* 🆕 NOWA: Interaktywna mapa */}
				<WorldMap
					visitedCountries={visitedCountries.map(c => c.name)}
					onCountryClick={handleAddCountry}
					isDarkMode={isDarkMode}
				/>

				{/* 🆕 NOWY: Tooltip z instrukcją (narożnik) */}
				<div className='absolute top-6 right-6 bg-white rounded-xl shadow-lg p-4 max-w-xs'>
					<h3 className='font-bold text-gray-800 mb-2 flex items-center gap-2'>
						<span>🗺️</span>
						<span>Interactive Map</span>
					</h3>
					<ul className='text-xs text-gray-600 space-y-1'>
						<li>
							🖱️ <strong>Click</strong> on a country to mark as visited
						</li>
						<li>
							👆 <strong>Hover</strong> to see country name
						</li>
						<li className='text-cyan-600 font-semibold'>Blue = Visited ✓</li>
						<li className='text-gray-400'>Gray = Not visited yet</li>
					</ul>
				</div>

				{/* Statystyki w narożniku */}
				<div className='absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4'>
					<h3 className='font-bold text-gray-800 mb-3 text-sm'>📊 Quick Stats</h3>
					<div className='grid grid-cols-3 gap-3 text-xs'>
						<div className='bg-cyan-50 rounded-lg p-2 text-center'>
							<div className='text-cyan-600 font-bold text-lg'>{visitedCount}</div>
							<div className='text-gray-600'>Countries</div>
						</div>
						<div className='bg-blue-50 rounded-lg p-2 text-center'>
							<div className='text-blue-600 font-bold text-lg'>{continentsVisited}/7</div>
							<div className='text-gray-600'>Continents</div>
						</div>
						<div className='bg-orange-50 rounded-lg p-2 text-center'>
							<div className='text-orange-600 font-bold text-lg'>{wishlist.length}</div>
							<div className='text-gray-600'>Wishlist</div>
						</div>
						<div className='bg-green-50 rounded-lg p-2 text-center'>
							<div className='text-green-600 font-bold text-lg'>{worldPercentage}%</div>
							<div className='text-gray-600'>World</div>
						</div>
						<div className='bg-purple-50 rounded-lg p-2 text-center'>
							<div className='text-purple-600 font-bold text-lg'>{totalCities}</div>
							<div className='text-gray-600'>Cities</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default App
