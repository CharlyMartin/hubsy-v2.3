// import React from 'react';
// import ButtonLink from './button_link';

// class TextImage extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   renderCorrectLink() {
//     if (this.props.btn !== undefined) {
//       return (
//         <ButtonLink path={this.props.btn.path}
//                     class={this.props.btn.color}
//                     content={this.props.btn.content} />
//       )
//     }

//     if (this.props.link !== undefined) {
//       return (
//         <a className={`button ${this.props.link.color}`} href={this.props.link.path} target="_blank" rel="noopener noreferrer">
//           {this.props.link.content}
//         </a>
//       )
//     }
    
//     return "";
//   }

//   renderText(padding_direction) {
//     return (
//       <div className={`text-column ${padding_direction}`}>
//         <h2>{this.props.title}</h2>
//         <p>{this.props.text}</p>
//         <br/>
//         <br/>
//         {this.renderCorrectLink()}
//       </div>
//     )
//   }

//   renderImage(padding_direction) {
//     return (
//       <div className={`picture-column ${padding_direction}`}>
        
//       </div>
//     )
//   }

//   renderElements() {    
//     if (this.props.image_side === "left") {
//       return (
//         <div className="column-layout">
//           {this.renderImage('pd-xl-right')}
//           {this.renderText('pd-xl-left')}
//         </div>
//       )
//     }

//     return (
//       <div className="column-layout">
//         {this.renderText('pd-xl-right')}
//         {this.renderImage('pd-xl-left')}
//       </div>
//     )
//   }

//   render() {
//     return (
//       <div className="pd-xxl-bottom mg-xxl-bottom">
//         {this.renderElements()}
//       </div>
//     );
//   }

// };

// export default TextImage;