export default class Show {
    html = () => {
      const hello = 'hlo';
      return (`
            <section id="show">
                ${hello}
            </section>`
      );
    }
}