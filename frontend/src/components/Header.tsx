function Header(props: { heading: string }) {
	return (
		<div>
			<br />
			<div className='row pt'>
				<div className='col-13 text-center'>
					<div className="display-4 font-weight-bold"><img src='/ACDLadders.png' width="100%" alt='logo'/></div>
				</div>
			</div>
			<hr />
		</div>

	)
}

export default Header;
