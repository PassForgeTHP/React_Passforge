export const ThemeProvider = ({children})=>{
  return(
    <ThemeContext.Provider>{children}</ThemeContext.Provider>
  )
}