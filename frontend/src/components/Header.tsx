function Header(props: { heading: string }) {
	return (
		<div>
			<br />
			<div className='row pt'>
				<div className='col-12 text-center'>
					<div className="display-4 font-weight-bold"><img src='/c2logo.png' width={100} alt='logo'/>{props.heading}</div>
				</div>
			</div>
			<hr />
		</div>

	)
}

export default Header;
