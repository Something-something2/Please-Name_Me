// Handlebars.registerHelper("ifDept", function(role, options) {
//   if (role === 1 ) {
//     return options.fn(this);
//   } else if (role === 2) {
//     return options.fn(this);
//   } else if (role === 3) {
//     return options.fn(this);
//   } else if (role === 4) {
//     return options.fn(this);
//   }
// });

module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
      },
      format_url: url => {
        return url
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];
      },
    }


//   Instead of doing this formatting with Moment, we use the methods built into the Date object. This way, we can avoid bringing in unnecessary dependencies. If we needed more utility around time and date manipulation, then we could justify adding Moment.