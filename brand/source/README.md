# Editable source notes

`originals/` preserves the supplied raster reference unchanged. The SVG masters in this directory are editable construction sources. Production SVGs are exported with text converted to paths so they have no runtime font dependency.

The construction deliberately uses simple vector geometry rather than automatic tracing. This keeps curves and rounded terminals clean at every size.
