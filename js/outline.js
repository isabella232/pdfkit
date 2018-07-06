// Generated by CoffeeScript 1.12.7
(function() {
  var PDFObject, PDFOutline, PDFPage;

  PDFObject = require('./object');

  PDFPage = require('./page');

  PDFOutline = (function() {
    function PDFOutline(document, parent, title, dest, options1) {
      this.document = document;
      this.options = options1 != null ? options1 : {
        expanded: false
      };
      this.outlineData = {};
      if (dest !== null) {
        this.outlineData['Dest'] = [dest.dictionary, 'Fit'];
      }
      if (parent !== null) {
        this.outlineData['Parent'] = parent;
      }
      if (title !== null) {
        this.outlineData['Title'] = new String(title);
      }
      this.dictionary = this.document.ref(this.outlineData);
      this.children = [];
    }

    PDFOutline.prototype.addItem = function(title, options) {
      var result;
      if (options == null) {
        options = {
          expanded: false
        };
      }
      result = new PDFOutline(this.document, this.dictionary, title, this.document.page, options);
      this.children.push(result);
      return result;
    };

    PDFOutline.prototype.endOutline = function() {
      var child, first, i, j, last, ref, ref1;
      if (this.children.length > 0) {
        if (this.options.expanded) {
          this.outlineData.Count = this.children.length;
        }
        ref = this.children, first = ref[0], last = ref[ref.length - 1];
        this.outlineData.First = first.dictionary;
        this.outlineData.Last = last.dictionary;
        for (i = j = 0, ref1 = this.children.length; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
          child = this.children[i];
          if (i > 0) {
            child.outlineData.Prev = this.children[i - 1].dictionary;
          }
          if (i < this.children.length - 1) {
            child.outlineData.Next = this.children[i + 1].dictionary;
          }
          child.endOutline();
        }
      }
      return this.dictionary.end();
    };

    return PDFOutline;

  })();

  module.exports = PDFOutline;

}).call(this);
