export type CleanOperation = {
  name: string
  selector: RegExp
  field: string
  fix?: (toFix: string) => string
}
