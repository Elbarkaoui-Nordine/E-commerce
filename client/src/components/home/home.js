import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Parallax } from "react-parallax";
import SliderPromo from './sliderPromo'
import Footer from '../footer/Footer';

const image1 = "https://i.imgur.com/wtIes8O.jpg";
function Home() {

    const [products, setProducts] = useState([]);
    let imageDefault = "https://i.ibb.co/j5qSV4j/missing.jpg";
    let nbrArctPop = 6;

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_LINK + '/api/product?clicks=true&limit=' + nbrArctPop).then(resp => {
            //Display Lowest Price Image
            let prices = {}
            let promos = {}
            let products_temp = resp.data.data
            let unavailable_msg = 'Available Soon...'
            $.each(products_temp, (i, product) => {
                prices[product.id] = []
                promos[product.id] = []
                if (isEmpty(product.subproducts)) {
                    //Product doesnt have subproducts, display unavailable_msg
                    prices[product.id].push(unavailable_msg)
                } else {
                    //Product has subproducts
                    product.subproducts.map(p => {
                        prices[product.id].push(p.price)
                        if (p.promo > 0) {
                            promos[product.id].push(p.promo)
                        }
                    })
                }
            })

            //Boucler sur l'objet pour voir si il y a un prix minimal ou si il n'est pas disponible
            if (Object.keys(prices).length > 0) {
                const entries = Object.entries(prices)
                for (const [id, prices_list] of entries) {
                    for (let j = 0; j < products_temp.length; j++) {
                        if (products_temp[j].id == id) {
                            if (prices_list[0] == unavailable_msg) {
                                products_temp[j]['lowest_price'] = unavailable_msg
                            } else {
                                let price = Math.min.apply(Math, prices_list)
                                if (isEmpty(promos[id])) {
                                    products_temp[j]['lowest_price'] = 'Starts at ' + price + ' €'
                                }
                                else {
                                    //let promo = (price) - (price * (promos[id] / 100))
                                    products_temp[j]['lowest_price'] = <span>Starts at {products_temp[j].price} € <s className="text-danger">{products_temp[j].basePrice} €</s></span>
                                }
                            }
                        }
                    }
                }
            }
            setProducts(products_temp)
        });
        return () => {
        }
    }, []);

    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    return (
        <div className="container-fluid h-100 p-0 m-0" >
            <Parallax bgImage={image1} strength={500}>
                <div className="HomeJumbotron">
                    <div>We can do anything,
                    <br />Together.</div>
                </div>
            </Parallax>
            <div className='homepageCat'>top products <br /><span>  </span></div>
            <div className="row justify-content-center m-0 p-0">
                <SliderPromo />
            </div>
            <div className="row justify-content-around m-0 p-0" style={{ borderBottom: "1px solid lightgrey" }}>
                {products.map((e) => {
                    return (
                        <div className="col-md-4 m-0 p-0" key={e.id}>
                            <div className='ProductHome'>
                                <div className='p-4 m-5 bg-gray'>
                                    <span className="HomeArticleTItle">{e.title.length > 50 ? e.title.substr(0, 50) + '...' : e.title}</span>
                                    <p>{e.lowest_price}</p>
                                    {e.images && e.status === true &&
                                        <> <a href={"/product/" + e.id}>
                                            <div className="ProductHomeImgContainer">
                                                {<img className="ProductHomeImg" src={e.images ? process.env.REACT_APP_API_LINK + '' + e.images[1] : imageDefault}></img>}
                                                {<img className="ProductHomeImg ProductHomeImg2" src={e.images && e.images.length > 1 ? process.env.REACT_APP_API_LINK + '' + e.images[0] : imageDefault}></img>}
                                            </div>
                                        </a>
                                            <a href={"/product/" + e.id}><button className='btn-cart'>View Product</button></a>
                                        </>
                                    }
                                    {e.images && e.status === false &&
                                        <> <a href={"/product/" + e.id}>
                                            <div className="ProductHomeImgContainer unavailable">
                                                <img className="ProductHomeImg" src={process.env.REACT_APP_API_LINK + '' + e.images[0]}></img>
                                                {e.images && e.images.length > 1 &&
                                                    <img className="ProductHomeImg ProductHomeImg2" src={process.env.REACT_APP_API_LINK + '' + e.images[1]}></img>
                                                }
                                                {/* <img className="ProductHomeImg" src={e.images !=== undefined ? process.env.REACT_APP_API_LINK + ''+e.images[0] : imageProduit1}></img> */}
                                                {/* <img className="ProductHomeImg ProductHomeImg2" src={imageProduit2}></img> */}
                                            </div>
                                        </a>
                                            <a href={"/product/" + e.id}> <button className='btn-cart unavailable' disabled>Product unavailable</button></a>
                                        </>
                                    }
                                    {!e.images &&
                                        <>
                                            <img className="ProductHomeImg" src="https://etienneetienne.com/wp-content/uploads/2013/08/square-blank.png"></img>
                                            <button className='btn-cart unavailable' disabled>Coming Soon</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
                <div className="col-sm-12 mt-5">
                  <Footer />
            </div>
        </div>
    )
}

export default Home;