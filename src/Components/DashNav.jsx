import Logo from '../assets/LogoDark.svg'
import Button from './ui/Button'

export const DashNav = () => {
    return (
        <div>
            <div className="h-20 flex justify-between items-center pl-12 pr-12">
                <img src={Logo} alt="logo" className='cursor-pointer' />
                <div>
                    <ul className='list-none flex space-x-12 items-center cursor-pointer'>
                        <li>Home</li>
                        <li>My Account</li>
                        <li>
                            <Button variant="primary" size="medium" onClick={() => alert('Primary Button Clicked')}>
                                Join Beta
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>

            <hr></hr>
        </div>
    )
}