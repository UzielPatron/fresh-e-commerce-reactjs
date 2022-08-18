import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal);

export const Alert = (title = 'Ha ocurrido un error', text = '', icon = '') => {
    mySwal.fire({
        title: <div>
                    <h4 style={{ fontWeight: '400', fontSize: '26px', }} >
                        { title }
                    </h4>
                    <p style={{ fontSize: '17px', fontWeight: '300', marginTop: '15px',}}>
                        { text }
                    </p>
                </div>,
        icon,
    });
};