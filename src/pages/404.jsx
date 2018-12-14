import React from 'react';
import { Link } from 'gatsby'
import Button from '../components/button';
import Layout from '../components/layout';

import '../css/pages/404.css'

class NotFoundPage extends React.Component {

  render() {
    return (
      <Layout prefix="/" locale="fr">
        <div>
          <div className="full-page">
            <div className="container">
              <h1>Cette page n'existe plus 😬</h1>
              <p>Et un jour toi aussi, tout comme cette page, tu n'existeras plus…  Ton temps est limité, ne le gâche sur des choses futiles. Tu dois bien avoir des rêves dans la vie non !? Tu sais comme ce road-trip en Australie avec tes potes, ou cette start-up dont tu parles à tout le monde depuis 3 ans.</p>
              <p>Ben alors, qu'est ce que tu attends ? Allez, attrape ton ordi, tes écouteurs et ton carnet de note. Passe chez Hubsy et commence à réaliser tes rêves. Avec du bon café, tout est possible 🙂</p>
              <p>Clique sur le bouton et trouve un espace proche de chez toi. On t'attend !</p>

              <br/>
              <br/>
              <Link to="/shops">
                <Button text="Nos Espaces" class="button-beige"/>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage
