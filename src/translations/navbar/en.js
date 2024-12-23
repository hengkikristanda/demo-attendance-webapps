module.exports = {
	menus: [
		{
			label: "About Us",
			subMenus: [
				{ label: "History", href: "/history" },
				{ label: "Duties & Functions", href: "/duties" },
				{ label: "Vision & Mission", href: "/our-purpose" },
				{ label: "Organizational Structure", href: "/organizational-structure" },
				{ label: "Leadership", href: "/our-leaders" },
				{ label: "Facilities", href: "/facilities" },
			],
		},
		{
			label: "Academics",
			subMenus: [
				{
					label: "Undergraduate",
					subMenus: [
						{
							label: "D-III Road Transportation Management",
							href: "/undergraduate/associate-road-transportation-management",
						},
						{
							label: "D-III Railway Transportation Management",
							href: "/undergraduate/associate-railway-transportation-management",
						},
						{
							label: "Bachelor of Applied Land Transportation Management",
							href: "/undergraduate/applied-bachelor-land-transportation-management",
						},
						{
							label: "Bachelor of Applied Automotive Engineering Technology",
							href: "/undergraduate/applied-bachelor-automotive-engineering-technology",
						},
					],
				},
				{
					label: "Post Graduate",
					subMenus: [
						{
							label: "Master in Marketing, Innovation and Technology",
							href: "/postgraduate/marketing-innovation-technology",
						},
						{
							label: "Master in Safety and Risk Engineering",
							href: "/postgraduate/safety-risk-engineering",
						},
					],
				},
				{ label: "Training", href: "/training" },
				{ label: "Lecturers", href: "/lecturers" },
			],
		},
		{
			label: "For Students",
			subMenus: [{ label: "Electronic Library", href: "https://e-library.ptdisttd.ac.id/" }],
		},
		{
			label: "Information",
			subMenus: [
				{ label: "News", href: "/news" },
				{ label: "PPID", href: "https://ptdisttd.ac.id/halaman-ppid" },
			],
		},
	],
};
