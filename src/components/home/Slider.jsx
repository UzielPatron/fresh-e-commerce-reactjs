import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/components/home/slider.css';
import { API_URL } from '../../utils/constants';


export const Slider = ({ images }) => {
    
    const slider = useRef(null);
    const buttonNext = useRef(null);
    const buttonPrev = useRef(null);
    const [isDesktop, setIsDesktop] = useState( document.documentElement.clientWidth );

    const checkIsDesktop = () => {
        setIsDesktop( document.documentElement.clientWidth );
    }

    window.onresize = checkIsDesktop;


    const onClickNext = () => {
        if( slider?.current?.children?.length > 0 ) {
            const firstElement = slider.current.firstChild;

            slider.current.style.transition = `1000ms ease-out all`;
            slider.current.style.transform = `translateX(-${ firstElement.offsetWidth }px)`;

            setTimeout( () => {
                slider.current.style.transition = 'none';
                slider.current.style.transform = `translateX(0)`;

                slider.current.appendChild(firstElement);
            }, 1000 )
        }
    };


    const onClickPrev = () => {
        if( slider.current?.children.length > 0 ) {
            const firstElement = slider.current.children[0];
            const lastElement = slider.current.children[slider.current.children.length - 1];

            slider.current.insertBefore(lastElement, slider.current.firstChild);

            slider.current.style.transition = 'none';

            
            slider.current.style.transform = `translateX(-${ firstElement.offsetWidth }px)`;

            setTimeout( () => {
                slider.current.style.transition = '1000ms ease-out all'
                slider.current.style.transform = `translateX(0)`;
                
            }, 1)
        }
    };

    useEffect(() => {
        let interval = setInterval( () => {
            onClickNext();
        }, 5000);
        
        slider.current.addEventListener('mouseenter', () => {
            clearInterval( interval );
        } );

        slider.current.addEventListener('mouseleave', () => {
            clearInterval( interval );
            interval = setInterval( () => {
                onClickNext();
            }, 5000);
        } );



        buttonNext.current.addEventListener('mouseenter', () => {
            clearInterval( interval );
        } );

        buttonNext.current.addEventListener('mouseleave', () => {
            clearInterval( interval );
            interval = setInterval( () => {
                onClickNext();
            }, 5000);
        } );




        buttonPrev.current.addEventListener('mouseenter', () => {
            clearInterval( interval );
        } );

        buttonPrev.current.addEventListener('mouseleave', () => {
            clearInterval( interval );
            interval = setInterval( () => {
                onClickNext();
            }, 5000);
        } );       
        
    },[])


    return (
        <div className="slider-container">
            <div className="slider" ref={ slider }>
                
                {
                    
                    ( isDesktop < 768 )
                        ? images.mobile?.map( image => (
                            <Link to={ `/search/notebook` } key={ image?.id } >
                                <img src={ `${ API_URL }${ image?.url }` } alt={ image?.name } className="slider-img" />
                            </Link>
                        ))

                        : images.desktop?.map( image => (
                            <Link to={ `/search/celular` } key={ image.id } >
                                <img src={ `${ API_URL }${ image?.url }` } alt={ image.name } className="slider-img" />
                            </Link>
                        ))

                }

            </div>
            <div>
                <button onClick={ onClickPrev } className="slider-button left-button" ref={ buttonPrev }>
                    <div className="slider-button-icon">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                </button>
                <button onClick={ onClickNext } className="slider-button right-button" ref={ buttonNext } >
                    <div className="slider-button-icon">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                </button>
            </div>
        </div>
    )
};