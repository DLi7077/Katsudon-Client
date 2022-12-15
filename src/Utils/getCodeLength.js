export default function getCodeLength(code) {
  return code.replace(/\s/g, "").length;
}
