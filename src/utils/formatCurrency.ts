export default function formatCurrency(_number: number): string {
    return _number.toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + String.fromCharCode(160));
}
