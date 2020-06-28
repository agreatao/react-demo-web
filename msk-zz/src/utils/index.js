Number.prototype.format = function () {
    if (isNaN(this)) return 0;
    return this.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}

Number.prototype.prefix = function (length, char = '0') {
    if (!isNaN(this)) return 0;
    return (Array(length).join(char) + this).slice(-length);
}