// Code: ThemePrvider component
import {useSelector} from 'react-redux'
import { PropTypes } from 'prop-types';




const ThemeProvider = ({children}) => {

    const theme = useSelector(state => state.theme);

  return (
    <div className={theme}>
         <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </div>
  )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ThemeProvider