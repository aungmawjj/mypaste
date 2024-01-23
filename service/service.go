package service

import (
	"embed"
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
	echomw "github.com/labstack/echo/v4/middleware"
)

func Start() {
	gClientId := "605091559450-3jl3h3ev302tgbd5c1eaqi1hel28squt.apps.googleusercontent.com"
	signingKey := "secret"
	webappBundleDir := "webapp/dist"
	e := echo.New()
	e.Renderer = NewRenderer()
	e.Use(echomw.Logger())
	e.Use(echomw.Gzip())
	e.Use(NewWebappServerMiddleware(webappBundleDir))
	_ = NewAuthMiddleware(signingKey)

	e.GET("/login", MakeLoginPageHandler(gClientId, "/login-callback"))
	e.POST("/login-callback", MakeLoginCallbackHandler(signingKey, NewIdTokenValidator(gClientId)))
	e.Logger.Fatal(e.Start("localhost:8080"))
}

func NewWebappServerMiddleware(bundleDir string) echo.MiddlewareFunc {
	return echomw.StaticWithConfig(echomw.StaticConfig{
		Root:   bundleDir,
		Index:  "index.html",
		Browse: false,
		HTML5:  true,
	})
}

func RootHandler(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, Welcome!")
}

type EchoContext interface {
	echo.Context
}

//go:embed templates/*
var templateFS embed.FS

type Renderer struct {
	template *template.Template
}

func NewRenderer() *Renderer {
	return &Renderer{
		template.Must(template.ParseFS(templateFS, "templates/*.html")),
	}
}

func (t *Renderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.template.ExecuteTemplate(w, name+".html", data)
}
